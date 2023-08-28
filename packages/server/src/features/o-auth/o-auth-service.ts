import { YandexCodeDto, YandexToken, YandexTokens } from './oauth-models'
import axios from 'axios'
import FormData from 'form-data'
import { ApiError } from '../../exceptions/api-error'
import { User, UserCreateRequest } from '../user/user-model'
import md5 from 'md5'

const YANDEX_OAUTH_CLIENT_ID = process.env.YANDEX_OAUTH_CLIENT_ID
const YANDEX_OAUTH_CLIENT_SECRET = process.env.YANDEX_OAUTH_CLIENT_SECRET

class OAuthService {
  public async yandex(dto: YandexCodeDto): Promise<string> {
    const { code } = dto
    let userYandex: UserCreateRequest
    // получаем токены Yandex
    const tokensDto = await this._getYandexTokens(+code)

    // проверим есть такой токен или нет
    const found = await YandexToken.findOne({
      where: { accessToken: tokensDto.accessToken },
    })
    if (!found) {
      // такого нет, значит надо зарегистрировать
      // но сперва надо проверить нет ли пользователя с таким email и телефоном
      // получим данные пользователя из Yandex
      userYandex = await this._getYandexUserData(tokensDto.accessToken)
      // теперь посмотрим в базе
      const user = await User.findOne({
        where: { email: userYandex.email, phone: userYandex.phone },
      })
      if (user) {
        // если такой пользователь уже зарегистрирован, тогда надо записать его токены для будущих OAuth авторизаций
        await YandexToken.findOne({ where: { userId: user.id } })
          .then(async res => {
            if (res) {
              await YandexToken.update(
                { ...tokensDto },
                { where: { userId: user.id } }
              )
            } else {
              await YandexToken.create({ ...tokensDto, userId: user.id })
            }
          })
          .catch(() => {
            throw ApiError.SomethingWrong()
          })
        if (user.authCookie) {
          return user.authCookie
        } else {
          user.authCookie = md5(JSON.stringify(user) + Date().toString())
          return user.authCookie
        }
      } else {
        // такого пользователя нет, значит надо зарегить
        const regUser = await User.create({
          ...userYandex,
          password: md5(userYandex.password),
        })
        const authCookie = md5(JSON.stringify(regUser) + Date().toString())
        regUser.authCookie = authCookie
        await regUser.save()
        // запишем его токены и вернем authCookie на front
        await YandexToken.create({
          ...tokensDto,
          userId: regUser.id,
        })
        return authCookie
      }
    } else {
      // а если такой токен в базе есть, вытащим authCookie пользователя и отдадим его на front
      const user = await User.findOne({ where: { id: found.userId } })
      if (user) {
        return user.authCookie
      } else {
        throw ApiError.UnauthorizedError()
      }
    }
  }

  private async _getYandexUserData(
    accessToken: string
  ): Promise<UserCreateRequest> {
    const res = await axios
      .get('https://login.yandex.ru/info?format=json', {
        headers: {
          Authorization: `OAuth ${accessToken}`,
        },
      })
      .catch(() => {
        throw ApiError.UnauthorizedError()
      })
    return {
      first_name: res.data.first_name,
      second_name: res.data.last_name,
      login: res.data.login,
      email: res.data.default_email,
      phone: res.data.default_phone.number,
      password: 'qweQWE123',
    }
  }

  private async _getYandexTokens(code: number): Promise<YandexTokens> {
    const formData = new FormData()
    formData.append('grant_type', 'authorization_code')
    formData.append('client_id', YANDEX_OAUTH_CLIENT_ID)
    formData.append('client_secret', YANDEX_OAUTH_CLIENT_SECRET)
    formData.append('code', code)
    const res = await axios
      .post('https://oauth.yandex.ru/token', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .catch(() => {
        throw new ApiError(400, 'Неверный код')
      })
    return {
      accessToken: res.data.access_token,
      refreshToken: res.data.refresh_token,
      expired: new Date(Date.now() + res.data.expires_in * 1000),
    }
  }
}

export default new OAuthService()

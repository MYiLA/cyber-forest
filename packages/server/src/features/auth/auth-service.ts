import md5 from 'md5'
import {
  UserCreateRequest,
  UserCreateResponse,
  UserLoginRequest,
  User,
} from '../user/user-model'
import { ApiError } from '../../exceptions/api-error'

class AuthService {
  public async authSignup(dto: UserCreateRequest): Promise<UserCreateResponse> {
    let user = await User.findOne({
      where: { login: dto.login, password: dto.email },
    })
    if (user) {
      throw new ApiError(
        400,
        'Пользователь с таким логином или email уже зарегистрирован'
      )
    }
    user = await User.create({ ...dto, password: md5(dto.password) })

    const authCookie = md5(JSON.stringify(user) + Date().toString())
    user.authCookie = authCookie
    await user.save()

    return { id: user.id, authCookie }
  }

  public async authSignin(dto: UserLoginRequest): Promise<string> {
    const user = await User.findOne({
      rejectOnEmpty: false,
      where: { login: dto.login, password: md5(dto.password) },
    })
    if (!user) {
      throw new ApiError(404, 'Неверный логин или пароль')
    }

    const authCookie = md5(JSON.stringify(user) + Date().toString())
    user.authCookie = authCookie
    await user.save()
    return authCookie
  }
}

export default new AuthService()

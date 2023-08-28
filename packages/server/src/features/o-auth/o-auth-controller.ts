import { Body, Controller, Post, Response, Route, Tags } from 'tsoa'
import OAuthService from './o-auth-service'
import { YandexCodeDto } from './oauth-models'

@Route('oauth')
@Tags('OAuth')
@Response(400, 'Неверный запрос')
@Response(401, 'Пользователь не авторизован')
@Response(404, 'Результатов не найдено')
@Response(500, 'Что-то пошло не так')
class OAuthController extends Controller {
  @Post('/yandex')
  public async yandex(@Body() body: YandexCodeDto): Promise<string> {
    return OAuthService.yandex(body)
  }
}

export default new OAuthController()

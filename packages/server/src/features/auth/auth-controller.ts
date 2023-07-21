import {
  Route,
  Tags,
  Controller,
  Post,
  Body,
  Produces,
  Get,
  Request,
  Example,
  Response,
} from 'tsoa'
import {
  UserCreateRequest,
  UserCreateResponse,
  UserLoginRequest,
  UserDto,
} from '../../features/user/user-model'
import AuthService from './auth-service'
import { CustomRequest, OK } from '../../config/types-constants'
import UserService from '../user/user-service'

@Route('auth')
@Tags('Auth')
@Response(400, 'Неверный запрос')
@Response(401, 'Пользователь не авторизован')
@Response(404, 'Результатов не найдено')
@Response(500, 'Что-то пошло не так')
class AuthController extends Controller {
  /** @summary Регистрация пользователя */
  @Post('/signup')
  public async signup(
    @Body() body: UserCreateRequest
  ): Promise<UserCreateResponse> {
    return AuthService.authSignup(body)
  }

  /** @summary Авторизация пользователя */
  @Post('/signin')
  @Produces('text/plain')
  @Example('OK')
  public async signin(@Body() body: UserLoginRequest): Promise<string> {
    return AuthService.authSignin(body)
  }

  /** @summary Данные пользователя */
  @Get('/user')
  public async userInfo(@Request() req: CustomRequest): Promise<UserDto> {
    const userId = req.userId || 0
    return UserService.getProfile(userId)
  }

  /** @summary Выход пользователя */
  @Post('/logout')
  @Produces('text/plain')
  @Example(OK)
  public logout(): OK {
    return OK
  }
}

export default new AuthController()

import {
  Controller,
  Put,
  Route,
  Tags,
  Get,
  Post,
  Path,
  Body,
  Request,
  Produces,
  Example,
  UploadedFile,
  Response,
} from 'tsoa'
import {
  UsersSearchRequest,
  UserDto,
  UserChanePasswordRequest,
  UserUpdateProfileRequest,
} from './user-model'
import UserService from './user-service'
import { CustomRequest, OK } from '../../config/types-constants'

@Route('user')
@Tags('Users')
@Response(400, 'Неверный запрос')
@Response(401, 'Пользователь не авторизован')
@Response(404, 'Результатов не найдено')
@Response(500, 'Что-то пошло не так')
class UserController extends Controller {
  /**
   * Достаточно передавать только те поля, по которым требуются изменения
   *
   * например для изменения настроек пользователя (допустим темы) достаточно передать поле settings
   * @summary Изменение профиля пользователя */
  @Put('/profile')
  public async updateProfile(
    @Body() body: UserUpdateProfileRequest,
    @Request() req: CustomRequest
  ): Promise<UserDto> {
    const userId = req.userId || 0
    return UserService.updateProfile(body, userId)
  }

  /** @summary Изменение аватара пользователя */
  @Put('/profile/avatar')
  public async updateAvatar(
    @UploadedFile() avatar: Express.Multer.File,
    @Request() req: CustomRequest
  ): Promise<UserDto> {
    const userId = req.userId || 0
    return UserService.updateAvatar(avatar, userId)
  }

  /** @summary Изменение пароля пользователя */
  @Put('/password')
  @Produces('text/plain')
  @Example(OK)
  public async updatePassword(
    @Body() body: UserChanePasswordRequest,
    @Request() req: CustomRequest
  ): Promise<OK> {
    const userId = req.userId || 0
    return UserService.updatePassword(body, userId)
  }

  /** @summary Получение профиля пользователя */
  @Get('/{id}')
  public async getProfile(@Path() id: number): Promise<UserDto> {
    return UserService.getProfile(id)
  }

  /** @summary Поиск пользователей по логину (макс 10) */
  @Post('/search')
  public async search(@Body() body: UsersSearchRequest): Promise<UserDto[]> {
    return UserService.search(body)
  }
}
export default new UserController()

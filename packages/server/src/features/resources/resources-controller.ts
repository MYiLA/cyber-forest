import {
  Controller,
  Get,
  Path,
  Post,
  Response,
  Route,
  SuccessResponse,
  Tags,
  UploadedFile,
} from 'tsoa'
import ResourcesService from './resources-service'
import { UploadedResource } from '../../config/types-constants'

@Route('resources')
@Tags('Resources')
@Response(400, 'Неверный запрос')
@Response(401, 'Пользователь не авторизован')
@Response(404, 'Результатов не найдено')
@Response(500, 'Что-то пошло не так')
class ResourcesController extends Controller {
  /** @summary Загрузка файла (макс 1Мб) */
  @Post('/')
  public async upload(
    @UploadedFile() resource: Express.Multer.File
  ): Promise<UploadedResource> {
    return ResourcesService.save(resource)
  }

  /** @summary Получение ранее загруженного файла */
  @Get('/{path}')
  @SuccessResponse(200, 'OK')
  public getResource(@Path() path: string): void {
    console.log(path)
  }
}

export default new ResourcesController()

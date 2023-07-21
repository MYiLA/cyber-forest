import {
  Body,
  Controller,
  Delete,
  Example,
  Path,
  Post,
  Produces,
  Put,
  Request,
  Response,
  Route,
  Tags,
} from 'tsoa'
import { ReplyCreateRequest, ReplyDto, ReplyUpdateRequest } from './reply-model'
import { CustomRequest, OK } from '../../../config/types-constants'
import ReplyService from './reply-service'

@Route('forum/reply')
@Tags('Forum.Reply')
@Response(400, 'Неверный запрос')
@Response(401, 'Пользователь не авторизован')
@Response(404, 'Результатов не найдено')
@Response(500, 'Что-то пошло не так')
class ReplyController extends Controller {
  /** @summary Добавить ответ */
  @Post('/')
  public async addReply(
    @Body() body: ReplyCreateRequest,
    @Request() req: CustomRequest
  ): Promise<ReplyDto> {
    const userId = req.userId || 0
    return ReplyService.addReply(body, userId)
  }

  /** @summary Изменить ответ */
  @Put('/{replyId}')
  @Produces('text/plain')
  @Example(OK)
  public async updateReply(
    @Body() body: ReplyUpdateRequest,
    @Path() replyId: number
  ): Promise<OK> {
    return ReplyService.updateReply(body, replyId)
  }

  /** @summary Удалить ответ */
  @Delete('/{replyId}')
  @Produces('text/plain')
  @Example(OK)
  public async removeReply(@Path() replyId: number): Promise<OK> {
    return ReplyService.removeReply(replyId)
  }
}

export default new ReplyController()

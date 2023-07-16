import {
  Body,
  Controller,
  Delete,
  Example,
  Get,
  Path,
  Post,
  Produces,
  Put,
  Request,
  Response,
  Route,
  Tags,
} from 'tsoa'
import {
  CommentCreateRequest,
  CommentDto,
  CommentUpdateRequest,
} from './comment-model'
import { CustomRequest, OK } from '../../../config/types-constants'
import CommentService from './comment-service'

@Route('forum/comment')
@Tags('Forum.Comment')
@Response(400, 'Неверный запрос')
@Response(401, 'Пользователь не авторизован')
@Response(404, 'Результатов не найдено')
@Response(500, 'Что-то пошло не так')
class CommentController extends Controller {
  /**
   * reactions - количество реакций на комментарий / ответ
   *
   * reacted - (true/false) наличие реакции от текущего пользователя
   * @summary Получить все комментарии */
  @Get('/{topicId}/{cursor}/{limit}')
  public async getComments(
    @Path() topicId: number,
    cursor: number,
    limit: number,
    @Request() req: CustomRequest
  ): Promise<CommentDto[]> {
    const userId = req.userId || 0
    return CommentService.getComments({ topicId, cursor, limit }, userId)
  }

  /** @summary Добавить комментарий */
  @Post('/')
  public async addComment(
    @Body() body: CommentCreateRequest,
    @Request() req: CustomRequest
  ): Promise<CommentDto> {
    const userId = req.userId || 0
    return CommentService.addComment(body, userId)
  }

  /** @summary Изменить комментарий */
  @Put('/{commentId}')
  @Produces('text/plain')
  @Example(OK)
  public async updateComment(
    @Body() body: CommentUpdateRequest,
    @Path() commentId: number
  ): Promise<OK> {
    return CommentService.updateComment(body, commentId)
  }

  /** @summary Удалить комментарий */
  @Delete('/{commentId}')
  @Produces('text/plain')
  @Example(OK)
  public async removeComment(@Path() commentId: number): Promise<OK> {
    return CommentService.removeComment(commentId)
  }
}

export default new CommentController()

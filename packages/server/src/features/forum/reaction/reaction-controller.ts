import { Body, Controller, Post, Request, Response, Route, Tags } from 'tsoa'
import { ReactionResponse, ReactionToggle } from './reaction-models'
import { CustomRequest } from '../../../config/types-constants'
import ReactionService from './reaction-service'

@Route('forum/reaction')
@Tags('Forum.Reaction')
@Response(400, 'Неверный запрос')
@Response(401, 'Пользователь не авторизован')
@Response(404, 'Результатов не найдено')
@Response(500, 'Что-то пошло не так')
class ReactionController extends Controller {
  /**
   * targetId - Id комментария / ответа
   *
   * target - 'comment' - для комментариев, 'reply' - для ответов
   * @summary Реакции на комментарии / ответы
   * */
  @Post('/')
  public async reactionToggle(
    @Body() body: ReactionToggle,
    @Request() req: CustomRequest
  ): Promise<ReactionResponse> {
    const userId = req.userId || 0
    return ReactionService.reactionToggle(body, userId)
  }
}

export default new ReactionController()

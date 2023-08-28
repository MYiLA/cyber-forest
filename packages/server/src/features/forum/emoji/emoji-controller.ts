import { Controller } from '@tsoa/runtime'
import { Body, Post, Request, Response, Route, Tags } from 'tsoa'
import { EmojiResponse, EmojiToggle } from './emoji-model'
import { CustomRequest } from '../../../config/types-constants'
import EmojiService from './emoji-service'

@Route('forum/emoji')
@Tags('Forum.Emoji')
@Response(400, 'Неверный запрос')
@Response(401, 'Пользователь не авторизован')
@Response(404, 'Результатов не найдено')
@Response(500, 'Что-то пошло не так')
class EmojiController extends Controller {
  @Post('/')
  public async emojiToggle(
    @Body() body: EmojiToggle,
    @Request() req: CustomRequest
  ): Promise<EmojiResponse> {
    const userId = req.userId || 0
    return EmojiService.emojiToggle(body, userId)
  }
}

export default new EmojiController()

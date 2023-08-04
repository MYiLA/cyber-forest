import { Emoji, EmojiResponse, EmojiToggle } from './emoji-model'
import { Topic } from '../topic/topic-model'
import { ApiError } from '../../../exceptions/api-error'

class EmojiService {
  public async emojiToggle(
    dto: EmojiToggle,
    userId: number
  ): Promise<EmojiResponse> {
    const present = await Topic.findOne({ where: { id: dto.topicId } })
    if (!present) {
      throw ApiError.NotFound()
    }

    const emoji = await Emoji.findOne({
      where: { userId, topicId: dto.topicId, emoji: dto.emoji },
    })

    if (emoji) {
      await emoji.destroy()
      return { reacted: false }
    } else {
      await Emoji.create({ userId, topicId: dto.topicId, emoji: dto.emoji })
      return { reacted: true }
    }
  }
}

export default new EmojiService()

import {
  ReactionComment,
  ReactionReply,
  ReactionResponse,
  ReactionToggle,
} from './reaction-models'
import { ReactionTarget } from '../../../config/types-constants'
import { ApiError } from '../../../exceptions/api-error'
import { Comment, CommentDto } from '../comment/comment-model'
import { Reply, ReplyDto } from '../reply/reply-model'

class ReactionService {
  public async reactionToggle(
    dto: ReactionToggle,
    userId: number
  ): Promise<ReactionResponse> {
    if (
      dto.target !== ReactionTarget.COMMENT &&
      dto.target !== ReactionTarget.REPLY
    ) {
      throw ApiError.BadRequest()
    }

    const Model =
      dto.target === ReactionTarget.COMMENT ? ReactionComment : ReactionReply

    let present: CommentDto | ReplyDto | null
    if (dto.target === ReactionTarget.COMMENT) {
      present = await Comment.findOne({ where: { id: dto.targetId } })
    } else {
      present = await Reply.findOne({ where: { id: dto.targetId } })
    }
    if (!present) {
      throw ApiError.NotFound()
    }

    const reaction = await Model.findOne({
      where: { targetId: dto.targetId, userId },
    })
    if (reaction) {
      await Model.destroy({ where: { targetId: dto.targetId, userId } })
      return { reacted: false }
    } else {
      await Model.create({ targetId: dto.targetId, userId })
      return { reacted: true }
    }
  }
}

export default new ReactionService()

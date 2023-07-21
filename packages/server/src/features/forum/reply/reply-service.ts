import {
  Reply,
  ReplyCreateRequest,
  ReplyDto,
  ReplyUpdateRequest,
} from './reply-model'
import { OK } from '../../../config/types-constants'
import { ApiError } from '../../../exceptions/api-error'
import { Comment } from '../comment/comment-model'

class ReplyService {
  public async addReply(
    dto: ReplyCreateRequest,
    userId: number
  ): Promise<ReplyDto> {
    const present = await Comment.findByPk(dto.commentId)
    if (!present) {
      throw ApiError.NotFound()
    }
    return await Reply.create({ ...dto, userId })
  }

  public async updateReply(
    dto: ReplyUpdateRequest,
    replyId: number
  ): Promise<OK> {
    const reply = await Reply.update({ ...dto }, { where: { id: replyId } })
    if (!reply || reply[0] < 1) {
      throw ApiError.NotFound()
    }
    return OK
  }

  public async removeReply(replyId: number): Promise<OK> {
    const reply = await Reply.destroy({ where: { id: replyId } })
    if (!reply) {
      throw ApiError.NotFound()
    }
    return OK
  }
}

export default new ReplyService()

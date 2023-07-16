import {
  Comment,
  CommentCreateRequest,
  CommentDto,
  CommentsRequest,
  CommentUpdateRequest,
} from './comment-model'
import { OK } from '../../../config/types-constants'
import { ApiError } from '../../../exceptions/api-error'
import { Topic } from '../topic/topic-model'

class CommentService {
  public async getComments(
    dto: CommentsRequest,
    userId: number
  ): Promise<CommentDto[]> {
    return await Comment.scope({ method: ['full', userId] }).findAll({
      where: { topicId: dto.topicId },
      offset: dto.cursor,
      limit: dto.limit,
    })
  }

  public async addComment(
    dto: CommentCreateRequest,
    userId: number
  ): Promise<CommentDto> {
    const present = await Topic.findByPk(dto.topicId)
    if (!present) {
      throw ApiError.NotFound()
    }
    return await Comment.create({ ...dto, userId })
  }

  public async updateComment(
    dto: CommentUpdateRequest,
    commentId: number
  ): Promise<OK> {
    const comment = await Comment.update(
      { ...dto },
      { where: { id: commentId } }
    )
    if (!comment || comment[0] < 1) {
      throw ApiError.NotFound()
    }
    return OK
  }

  public async removeComment(commentId: number): Promise<OK> {
    const comment = await Comment.destroy({ where: { id: commentId } })
    if (!comment) {
      throw ApiError.NotFound()
    }
    return OK
  }
}

export default new CommentService()

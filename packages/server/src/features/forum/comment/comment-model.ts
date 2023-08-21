import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Scopes,
  Sequelize,
  Table,
} from 'sequelize-typescript'
import { Reply, ReplyDto } from '../reply/reply-model'
import { AuthorDto, User } from '../../user/user-model'
import { Topic } from '../topic/topic-model'

export interface CommentCreateRequest {
  readonly body: string
  readonly topicId: number
}

export interface CommentUpdateRequest {
  readonly body: string
}

export interface CommentsRequest {
  readonly topicId: number
  readonly cursor: number
  readonly limit: number
}

export interface CommentDto {
  readonly id?: number
  readonly body?: string
  readonly topicId?: number
  readonly userId?: number
  readonly author?: AuthorDto
  readonly reactions?: number
  readonly reacted?: boolean
  readonly replies?: ReplyDto[]
  readonly createdAt?: Date
  readonly updatedAt?: Date
}

@Scopes(() => ({
  full: (userId: number) => {
    return {
      include: [
        User.scope('author'),
        Reply.scope({
          method: ['full', userId],
        }),
      ],
      attributes: {
        include: [
          [
            Sequelize.literal(
              '(SELECT CAST(COUNT(*) as INTEGER) FROM "reactions-comments" WHERE "reactions-comments"."targetId" = "Comment"."id")'
            ),
            'reactions',
          ],
          [
            Sequelize.literal(
              `(SELECT '${userId}' IN (SELECT "userId" FROM "reactions-comments" WHERE "reactions-comments"."userId" = '${userId}' AND "reactions-comments"."targetId" = "Comment"."id" LIMIT 1))`
            ),
            'reacted',
          ],
        ],
      },
    }
  },
}))
@Table({ tableName: 'comments' })
export class Comment extends Model<Comment, Partial<CommentDto>> {
  @Column(DataType.TEXT)
  declare body: string

  @ForeignKey(() => Topic)
  @Column(DataType.INTEGER)
  declare topicId: number

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  declare userId: number

  @BelongsTo(() => User)
  declare author: AuthorDto

  @HasMany(() => Reply)
  declare replies: Reply[]
}

import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Scopes,
  Sequelize,
  Table,
} from 'sequelize-typescript'
import { AuthorDto, User } from '../../user/user-model'
import { Comment } from '../comment/comment-model'

export interface ReplyCreateRequest {
  readonly body: string
  readonly commentId: number
}

export interface ReplyUpdateRequest {
  readonly body: string
}

export interface ReplyDto {
  readonly id?: number
  readonly userId?: number
  readonly author?: AuthorDto
  readonly reactions?: number
  readonly reacted?: boolean
  readonly commentId?: number
  readonly body?: string
  readonly createdAt?: Date
  readonly updatedAt?: Date
}

@Scopes(() => ({
  full: (userId: number) => {
    return {
      include: [User.scope('author')],
      attributes: {
        include: [
          [
            Sequelize.literal(
              '(SELECT CAST(COUNT(*) as INTEGER) FROM "reactions-replies" WHERE "reactions-replies"."targetId" = "replies"."id")'
            ),
            'reactions',
          ],
          [
            Sequelize.literal(
              `(SELECT '${userId}' IN (SELECT "userId" FROM "reactions-replies" WHERE "reactions-replies"."userId" = '${userId}' AND "reactions-replies"."targetId" = "replies"."id" LIMIT 1))`
            ),
            'reacted',
          ],
        ],
      },
    }
  },
}))
@Table({ tableName: 'replies' })
export class Reply extends Model<Reply, Partial<ReplyDto>> {
  @Column(DataType.TEXT)
  declare body: string

  @ForeignKey(() => Comment)
  @Column(DataType.INTEGER)
  declare commentId: number

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  declare userId: number

  @BelongsTo(() => User)
  declare author: AuthorDto
}

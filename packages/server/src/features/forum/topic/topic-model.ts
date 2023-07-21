import {
  BelongsTo,
  Column,
  DataType,
  DefaultScope,
  ForeignKey,
  HasMany,
  Model,
  Sequelize,
  Table,
} from 'sequelize-typescript'
import { Comment } from '../comment/comment-model'
import { AuthorDto, User } from '../../user/user-model'

export interface TopicCreateRequest {
  readonly title: string
  readonly body: string
}

export interface TopicsSearchRequest {
  readonly query: string
}

export interface TopicsRequest {
  readonly cursor: number
  readonly limit: number
}

export interface TopicDto {
  readonly id?: number
  readonly title?: string
  readonly body?: string
  readonly userId?: number
  readonly author?: AuthorDto
  readonly commentsQty?: number
  readonly createdAt?: Date
  readonly updatedAt?: Date
}

@DefaultScope(() => ({
  include: [User.scope('author')],
  attributes: {
    include: [
      [
        Sequelize.literal(
          '(SELECT COUNT(*) FROM "comments" as "Comment" WHERE "Comment"."topicId" = "Topic"."id")'
        ),
        'commentsQty',
      ],
    ],
  },
}))
@Table({ tableName: 'topics' })
export class Topic extends Model<Topic, Partial<TopicDto>> {
  @Column(DataType.STRING)
  declare title: string

  @Column(DataType.TEXT)
  declare body: string

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  declare userId: number

  @BelongsTo(() => User)
  declare author: AuthorDto

  @HasMany(() => Comment)
  declare comments: Comment[]
}

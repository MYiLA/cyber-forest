import { ReactionTarget } from '../../../config/types-constants'
import {
  Column,
  DataType,
  ForeignKey,
  Index,
  Model,
  Table,
} from 'sequelize-typescript'
import { Comment } from '../comment/comment-model'
import { Reply } from '../reply/reply-model'

export interface ReactionToggle {
  /** Id коммента / ответа */
  readonly targetId: number
  readonly target: ReactionTarget
}

export interface ReactionCreate extends ReactionToggle {
  readonly userId: number
}

export interface ReactionResponse {
  /** true - реакция установлена, false - снята */
  readonly reacted: boolean
}

@Table({ tableName: 'reactions-comments', timestamps: false })
export class ReactionComment extends Model<
  ReactionComment,
  Partial<ReactionCreate>
> {
  @ForeignKey(() => Comment)
  @Column(DataType.INTEGER)
  @Index
  declare targetId: number

  @Column(DataType.INTEGER)
  @Index
  declare userId: number
}

@Table({ tableName: 'reactions-replies', timestamps: false })
export class ReactionReply extends Model<
  ReactionReply,
  Partial<ReactionCreate>
> {
  @ForeignKey(() => Reply)
  @Column(DataType.INTEGER)
  @Index
  declare targetId: number

  @Column(DataType.INTEGER)
  @Index
  declare userId: number
}

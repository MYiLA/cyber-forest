import {
  Column,
  createIndexDecorator,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript'
import { Topic } from '../topic/topic-model'

export interface EmojiToggle {
  readonly topicId: number
  readonly emoji: string
}

export interface EmojiCreate extends EmojiToggle {
  readonly userId: number
}

export interface EmojiResponse {
  readonly reacted: boolean
}

export interface EmojiDto {
  readonly emoji: string
  readonly qty: number
  readonly reacted: boolean
}

export interface EmojiRow {
  readonly id: number
  readonly topicId: number
  readonly userId: number
  readonly emoji: string
}

const EmojiIndex = createIndexDecorator({
  name: 'topicId-userId-emoji',
  unique: true,
})

@Table({ tableName: 'emojis', timestamps: false })
export class Emoji extends Model<Emoji, Partial<EmojiCreate>> {
  @ForeignKey(() => Topic)
  @Column(DataType.INTEGER)
  @EmojiIndex
  declare topicId: number

  @Column(DataType.INTEGER)
  @EmojiIndex
  declare userId: number

  @Column(DataType.STRING(15))
  @EmojiIndex
  declare emoji: string
}

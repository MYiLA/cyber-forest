import {
  Topic,
  TopicCreateRequest,
  TopicDto,
  TopicsRequest,
} from './topic-model'
import { ApiError } from '../../../exceptions/api-error'
import { OK } from '../../../config/types-constants'
import { Op } from 'sequelize'
import { EmojiDto, EmojiRow } from '../emoji/emoji-model'

const isEmojiRows = (val: EmojiRow[] | EmojiDto[]): val is EmojiRow[] => {
  return (val as EmojiRow[]).every(el => 'id' in el && 'topicId' in el)
}

class TopicService {
  public async getTopics(
    dto: TopicsRequest,
    userId: number
  ): Promise<TopicDto[]> {
    return await Topic.findAll({
      offset: dto.cursor,
      limit: dto.limit <= 100 ? dto.limit : 100,
      order: [['updatedAt', 'DESC']],
    }).then(res =>
      res.map(row => ({
        ...row.get({ plain: true }),
        emojis: this._calcEmojis(row.get({ plain: true }).emojis, userId),
      }))
    )
  }

  public async addTopic(
    dto: TopicCreateRequest,
    userId: number
  ): Promise<TopicDto> {
    return await Topic.create({ ...dto, userId })
  }

  public async updateTopic(
    dto: TopicCreateRequest,
    topicId: number
  ): Promise<OK> {
    const topic = await Topic.update({ ...dto }, { where: { id: topicId } })
    if (!topic || topic[0] < 1) {
      throw ApiError.NotFound()
    }
    return OK
  }

  public async removeTopic(topicId: number): Promise<OK> {
    const topic = await Topic.destroy({ where: { id: topicId } })
    if (!topic) {
      throw ApiError.NotFound()
    }
    return OK
  }

  public async searchTopic(query: string): Promise<TopicDto[]> {
    return await Topic.findAll({
      where: { title: { [Op.iLike]: `%${query}%` } },
      limit: 10,
    })
  }

  private _calcEmojis(
    data: EmojiRow[] | EmojiDto[],
    userId: number
  ): EmojiDto[] {
    const tmp: Record<string, { qty: number; users: Array<number> }> = {}
    if (isEmojiRows(data)) {
      data.forEach(item => {
        if (tmp[item.emoji]) {
          tmp[item.emoji].qty++
          tmp[item.emoji].users.push(item.userId)
        } else {
          tmp[item.emoji] = { qty: 1, users: [item.userId] }
        }
      })
    }
    const result = []
    for (const [key, value] of Object.entries(tmp)) {
      result.push({
        emoji: key,
        qty: value.qty,
        reacted: value.users.includes(userId),
      })
    }
    return result
  }
}

export default new TopicService()

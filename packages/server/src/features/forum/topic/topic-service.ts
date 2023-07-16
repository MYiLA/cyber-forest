import {
  Topic,
  TopicCreateRequest,
  TopicDto,
  TopicsRequest,
} from './topic-model'
import { ApiError } from '../../../exceptions/api-error'
import { OK } from '../../../config/types-constants'
import { Op } from 'sequelize'

class TopicService {
  public async getTopics(dto: TopicsRequest): Promise<TopicDto[]> {
    return await Topic.findAll({
      offset: dto.cursor,
      limit: dto.limit,
    })
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
      where: { title: { [Op.like]: `%${query}%` } },
      limit: 10,
    })
  }
}

export default new TopicService()

import {
  Body,
  Controller,
  Delete,
  Example,
  Get,
  Path,
  Post,
  Produces,
  Put,
  Request,
  Response,
  Route,
  Tags,
} from 'tsoa'
import {
  TopicCreateRequest,
  TopicDto,
  TopicsSearchRequest,
} from './topic-model'
import TopicService from './topic-service'
import { CustomRequest, OK } from '../../../config/types-constants'

@Route('forum/topic')
@Tags('Forum.Topic')
@Response(400, 'Неверный запрос')
@Response(401, 'Пользователь не авторизован')
@Response(404, 'Результатов не найдено')
@Response(500, 'Что-то пошло не так')
class TopicController extends Controller {
  /** @summary Получить все топики */
  @Get('/{cursor}/{limit}')
  public async getTopics(
    @Path() cursor: number,
    limit: number
  ): Promise<TopicDto[]> {
    return TopicService.getTopics({ cursor, limit })
  }

  /** @summary Найти топики (макс. 10) */
  @Post('/search')
  public async searchTopic(
    @Body() body: TopicsSearchRequest
  ): Promise<TopicDto[]> {
    const { query } = body
    return TopicService.searchTopic(query)
  }

  /** @summary Добавить топик */
  @Post('/')
  public async addTopic(
    @Body() body: TopicCreateRequest,
    @Request() req: CustomRequest
  ): Promise<TopicDto> {
    const userId = req.userId || 0
    return TopicService.addTopic(body, userId)
  }

  /** @summary Изменить топик */
  @Put('/{topicId}')
  @Produces('text/plain')
  @Example(OK)
  public async updateTopic(
    @Body() body: TopicCreateRequest,
    @Path() topicId: number
  ): Promise<OK> {
    return TopicService.updateTopic(body, topicId)
  }

  /** @summary Удалить топик */
  @Delete('/{topicId}')
  @Produces('text/plain')
  @Example(OK)
  public async removeTopic(@Path() topicId: number): Promise<OK> {
    return TopicService.removeTopic(topicId)
  }
}

export default new TopicController()

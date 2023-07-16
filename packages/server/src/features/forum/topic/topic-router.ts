import { NextFunction, Response, Router } from 'express'
import { CustomRequest } from '../../../config/types-constants'
import TopicController from './topic-controller'
import ForumValidator from '../forum-validator'

export const topicRouter = Router()

topicRouter.get(
  '/:cursor/:limit',
  ForumValidator.params(['cursor', 'limit']),
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const { cursor, limit } = req.params
      const response = await TopicController.getTopics(+cursor, +limit)
      return res.send(response)
    } catch (e) {
      return next(e)
    }
  }
)

topicRouter.post(
  '/',
  ForumValidator.body([
    { field: 'title', type: 'string', required: true },
    { field: 'body', type: 'string', required: true },
  ]),
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const response = await TopicController.addTopic(req.body, req)
      return res.send(response)
    } catch (e) {
      return next(e)
    }
  }
)

topicRouter.post(
  '/search',
  ForumValidator.body([{ field: 'query', type: 'string', required: true }]),
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const response = await TopicController.searchTopic(req.body)
      return res.send(response)
    } catch (e) {
      return next(e)
    }
  }
)

topicRouter.put(
  '/:topicId',
  ForumValidator.params(['topicId']),
  ForumValidator.body([
    { field: 'title', type: 'string', required: false },
    { field: 'body', type: 'string', required: false },
  ]),
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const { topicId } = req.params
      const response = await TopicController.updateTopic(req.body, +topicId)
      return res.send(response)
    } catch (e) {
      return next(e)
    }
  }
)

topicRouter.delete(
  '/:topicId',
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const { topicId } = req.params
      const response = await TopicController.removeTopic(+topicId)
      return res.send(response)
    } catch (e) {
      return next(e)
    }
  }
)

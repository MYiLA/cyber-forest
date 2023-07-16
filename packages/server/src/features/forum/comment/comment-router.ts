import { NextFunction, Response, Router } from 'express'
import { CustomRequest } from '../../../config/types-constants'
import CommentController from './comment-controller'
import ForumValidator from '../forum-validator'

export const commentRouter = Router()

commentRouter.get(
  '/:topicId/:cursor/:limit',
  ForumValidator.params(['topicId', 'cursor', 'limit']),
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const { topicId, cursor, limit } = req.params
      const response = await CommentController.getComments(
        +topicId,
        +cursor,
        +limit,
        req
      )
      return res.send(response)
    } catch (e) {
      return next(e)
    }
  }
)

commentRouter.post(
  '/',
  ForumValidator.body([
    { field: 'body', type: 'string', required: true },
    { field: 'topicId', type: 'number', required: true },
  ]),
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const response = await CommentController.addComment(req.body, req)
      return res.send(response)
    } catch (e) {
      return next(e)
    }
  }
)

commentRouter.put(
  '/:commentId',
  ForumValidator.params(['commentId']),
  ForumValidator.body([{ field: 'body', type: 'string', required: true }]),
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const { commentId } = req.params
      const response = await CommentController.updateComment(
        req.body,
        +commentId
      )
      return res.send(response)
    } catch (e) {
      return next(e)
    }
  }
)

commentRouter.delete(
  '/:commentId',
  ForumValidator.params(['commentId']),
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const { commentId } = req.params
      const response = await CommentController.removeComment(+commentId)
      return res.send(response)
    } catch (e) {
      return next(e)
    }
  }
)

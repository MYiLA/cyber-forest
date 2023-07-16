import { NextFunction, Response, Router } from 'express'
import { CustomRequest } from '../../../config/types-constants'
import ReplyController from './reply-controller'
import ForumValidator from '../forum-validator'

export const replyRouter = Router()

replyRouter.post(
  '/',
  ForumValidator.body([
    { field: 'body', type: 'string', required: true },
    { field: 'commentId', type: 'number', required: true },
  ]),
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const response = await ReplyController.addReply(req.body, req)
      return res.send(response)
    } catch (e) {
      return next(e)
    }
  }
)

replyRouter.put(
  '/:replyId',
  ForumValidator.params(['replyId']),
  ForumValidator.body([{ field: 'body', type: 'string', required: true }]),
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const { replyId } = req.params
      const response = await ReplyController.updateReply(req.body, +replyId)
      return res.send(response)
    } catch (e) {
      return next(e)
    }
  }
)

replyRouter.delete(
  '/:replyId',
  ForumValidator.params(['replyId']),
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const { replyId } = req.params
      const response = await ReplyController.removeReply(+replyId)
      return res.send(response)
    } catch (e) {
      return next(e)
    }
  }
)

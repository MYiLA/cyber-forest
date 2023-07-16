import { NextFunction, Response, Router } from 'express'
import { CustomRequest } from '../../../config/types-constants'
import ReactionController from './reaction-controller'
import ForumValidator from '../forum-validator'

export const reactionRouter = Router()

reactionRouter.post(
  '/',
  ForumValidator.body([
    { field: 'targetId', type: 'number', required: true },
    { field: 'target', type: 'string', required: true },
  ]),
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const response = await ReactionController.reactionToggle(req.body, req)
      return res.send(response)
    } catch (e) {
      return next(e)
    }
  }
)

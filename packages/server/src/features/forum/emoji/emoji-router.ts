import { NextFunction, Response, Router } from 'express'
import ForumValidator from '../forum-validator'
import { CustomRequest } from '../../../config/types-constants'
import EmojiController from './emoji-controller'

export const emojiRouter = Router()

emojiRouter.post(
  '/',
  ForumValidator.body([
    { field: 'topicId', type: 'number', required: true },
    { field: 'emoji', type: 'string', required: true },
  ]),
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const response = await EmojiController.emojiToggle(req.body, req)
      return res.send(response)
    } catch (e) {
      return next(e)
    }
  }
)

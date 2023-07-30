import { NextFunction, Response, Router } from 'express'
import { CustomRequest } from '../../config/types-constants'
import OAuthController from './o-auth-controller'

export const oAuthRouter = Router()

oAuthRouter.post(
  '/yandex',
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const response = await OAuthController.yandex(req.body)
      return res.send(response)
    } catch (e) {
      return next(e)
    }
  }
)

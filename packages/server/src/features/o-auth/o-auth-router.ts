import { NextFunction, Response, Router } from 'express'
import { CustomRequest } from '../../config/types-constants'
import OAuthController from './o-auth-controller'

export const oAuthRouter = Router()

oAuthRouter.post(
  '/yandex',
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const authCookie = await OAuthController.yandex(req.body)
      res.cookie('authCookie', authCookie, {
        expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      })
      return res.send({ authCookie })
    } catch (e) {
      return next(e)
    }
  }
)

import { NextFunction, Request, Response, Router } from 'express'
import AuthController from './auth-controller'
import { AuthMiddleware } from '../../middlewares/auth-middleware'
import { CustomRequest, OK } from '../../config/types-constants'
import AuthValidator from './auth-validator'

export const authRouter = Router()

authRouter.post(
  '/signup',
  AuthValidator.authSignup,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, authCookie } = await AuthController.signup(req.body)
      res.cookie('authCookie', authCookie, {
        expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      })
      return res.send({ id })
    } catch (e) {
      return next(e)
    }
  }
)

authRouter.post(
  '/signin',
  AuthValidator.authSignin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authCookie = await AuthController.signin(req.body)
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

authRouter.get(
  '/user',
  AuthMiddleware,
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const user = await AuthController.userInfo(req)
      return res.send(user)
    } catch (e) {
      return next(e)
    }
  }
)

authRouter.post(
  '/logout',
  AuthMiddleware,
  (req: CustomRequest, res: Response) => {
    res.clearCookie('authCookie', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    })
    return res.send(OK)
  }
)

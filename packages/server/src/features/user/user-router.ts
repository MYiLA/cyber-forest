import { NextFunction, Response, Router } from 'express'
import { CustomRequest } from '../../config/types-constants'
import UserController from './user-controller'
import { UploadMiddleware } from '../../middlewares/upload-middleware'
import { ApiError } from '../../exceptions/api-error'
import UserValidator from './user-validator'

export const userRouter = Router()

userRouter.put(
  '/profile',
  UserValidator.userProfile,
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const response = await UserController.updateProfile(req.body, req)
      return res.send(response)
    } catch (e) {
      return next(e)
    }
  }
)

userRouter.put(
  '/profile/avatar',
  UploadMiddleware('avatar'),
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      if (req.file) {
        const response = await UserController.updateAvatar(req.file, req)
        return res.send(response)
      } else {
        return next(ApiError.SomethingWrong())
      }
    } catch (e) {
      return next(e)
    }
  }
)

userRouter.put(
  '/password',
  UserValidator.userPassword,
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const response = await UserController.updatePassword(req.body, req)
      return res.send(response)
    } catch (e) {
      return next(e)
    }
  }
)

userRouter.get(
  '/:id',
  UserValidator.userInfo,
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const user = await UserController.getProfile(+req.params.id)
      return res.send(user)
    } catch (e) {
      return next(e)
    }
  }
)

userRouter.post(
  '/search',
  UserValidator.userSearch,
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const response = await UserController.search(req.body)
      return res.send(response)
    } catch (e) {
      return next(e)
    }
  }
)

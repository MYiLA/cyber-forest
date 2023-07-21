// Проверка авторизации по cookie
// если пользователь авторизован, то в Request добавляется userId
// Чтобы в дальнейшем не обращаться каждый раз к базе
// Если не авторизован, то ошибка 401 UnauthorizedError
import { NextFunction, Response } from 'express'
import { ApiError } from '../exceptions/api-error'
import { User } from '../features/user/user-model'
import { CustomRequest } from '../config/types-constants'

export const AuthMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authCookie } = req.cookies
    if (!authCookie) {
      return next(ApiError.UnauthorizedError())
    }
    const user = await User.findOne({
      where: { authCookie },
      attributes: { exclude: ['authCookie'] },
    })

    if (!user) {
      return next(ApiError.UnauthorizedError())
    }

    req.userId = user.id
    next()
  } catch (e) {
    return next(ApiError.SomethingWrong())
  }
}

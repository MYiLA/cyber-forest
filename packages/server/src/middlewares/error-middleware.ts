import { ApiError } from '../exceptions/api-error'
import { NextFunction, Request, Response } from 'express'

export const ErrorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ reason: err.message })
  }
  if (err.message === 'File too large') {
    return res
      .status(400)
      .json({ reason: 'Превышен максимальный размер файла' })
  }
  return res.status(500).json({ reason: 'Что-то пошло не так...' })
  next()
}

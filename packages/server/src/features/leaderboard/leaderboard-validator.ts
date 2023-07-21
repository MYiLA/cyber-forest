import { CustomRequest } from '../../config/types-constants'
import { NextFunction, Response } from 'express'
import { ApiError } from '../../exceptions/api-error'

const add = (req: CustomRequest, res: Response, next: NextFunction) => {
  const { data, ratingFieldName, teamName } = req.body
  if (!data || !ratingFieldName || !teamName) {
    next(ApiError.BadRequest())
  }
  if (!data[ratingFieldName]) {
    next(new ApiError(400, 'RatingFieldName должно быть в data'))
  }
  next()
}

const getAll = (req: CustomRequest, res: Response, next: NextFunction) => {
  const { cursor, ratingFieldName, limit } = req.body
  if (
    !ratingFieldName ||
    typeof cursor !== 'number' ||
    typeof limit !== 'number'
  ) {
    next(ApiError.BadRequest())
  }
  next()
}

const getByTeam = (req: CustomRequest, res: Response, next: NextFunction) => {
  const { cursor, ratingFieldName, limit } = req.body
  const { teamName } = req.params
  if (
    !teamName ||
    !ratingFieldName ||
    typeof cursor !== 'number' ||
    typeof limit !== 'number'
  ) {
    next(ApiError.BadRequest())
  }
  next()
}

export default { add, getAll, getByTeam }

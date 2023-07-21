import { NextFunction, Response } from 'express'
import { CustomRequest } from '../../config/types-constants'
import { ApiError } from '../../exceptions/api-error'

const params = (fields: Array<string>) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    fields.forEach(field => {
      if (!req.params[field] || isNaN(+req.params[field])) {
        next(ApiError.BadRequest())
      }
    })
    next()
  }
}

type ValidationFields = {
  field: string
  required: boolean
  type: string
}

const body = (fields: Array<ValidationFields>) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    let cnt = 0
    fields.forEach(field => {
      if (!(typeof req.body[field.field] === 'undefined' && !field.required)) {
        if (
          req.body[field.field] &&
          typeof req.body[field.field] === field.type
        ) {
          if (typeof req.body[field.field] === 'string') {
            if (!req.body[field.field].length) {
              next(ApiError.BadRequest())
            } else {
              cnt++
            }
          } else {
            cnt++
          }
        } else {
          next(ApiError.BadRequest())
        }
      }
    })
    if (cnt) {
      next()
    } else {
      next(ApiError.BadRequest())
    }
  }
}
export default { params, body }

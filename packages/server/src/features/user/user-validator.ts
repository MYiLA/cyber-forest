import { CustomRequest } from '../../config/types-constants'
import { NextFunction, Response } from 'express'
import { ApiError } from '../../exceptions/api-error'
import { updateProfileRules } from '../../config/rules'

const userProfile = (req: CustomRequest, res: Response, next: NextFunction) => {
  if (!Object.keys(req.body).length) {
    next(ApiError.BadRequest())
  }
  for (const [key, value] of Object.entries<string>(req.body)) {
    if (updateProfileRules[key] && !value.match(updateProfileRules[key].rule)) {
      next(new ApiError(400, updateProfileRules[key].message))
    }
  }
  next()
}

const userPassword = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { oldPassword, newPassword } = req.body
  if (
    !oldPassword ||
    !newPassword ||
    !oldPassword.length ||
    !newPassword.length
  ) {
    next(ApiError.BadRequest())
  }
  next()
}

const userInfo = (req: CustomRequest, res: Response, next: NextFunction) => {
  const { id } = req.params
  if (!id || isNaN(+id)) {
    next(ApiError.BadRequest())
  }
  next()
}

const userSearch = (req: CustomRequest, res: Response, next: NextFunction) => {
  const { login } = req.body
  if (!login || !login.length) {
    next(ApiError.BadRequest())
  }
  next()
}
export default { userProfile, userPassword, userInfo, userSearch }

import { ApiError } from '../../exceptions/api-error'
import { NextFunction, Response } from 'express'
import { CustomRequest, Rules } from '../../config/types-constants'
import { signinRules, signupRules } from '../../config/rules'

const authSignin = (req: CustomRequest, res: Response, next: NextFunction) => {
  checkRules(req, signinRules, next)
}

const authSignup = (req: CustomRequest, res: Response, next: NextFunction) => {
  checkRules(req, signupRules, next)
}

const checkRules = (req: CustomRequest, rules: Rules, next: NextFunction) => {
  for (const [field, rule] of Object.entries(rules)) {
    if (!req.body[field].match(rule.rule)) {
      next(new ApiError(400, rule.message))
    }
  }
  next()
}

export default { authSignup, authSignin }

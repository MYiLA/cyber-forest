import { NextFunction, Response, Router } from 'express'
import LeaderboardController from './leaderboard-controller'
import { CustomRequest } from '../../config/types-constants'
import LeaderboardValidator from './leaderboard-validator'

export const leaderboardRouter = Router()

leaderboardRouter.post(
  '/',
  LeaderboardValidator.add,
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const response = await LeaderboardController.addToLeaderboard(req.body)
      return res.send(response)
    } catch (e) {
      return next(e)
    }
  }
)

leaderboardRouter.post(
  '/all',
  LeaderboardValidator.getAll,
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const response = await LeaderboardController.getAll(req.body)
      return res.send(response)
    } catch (e) {
      return next(e)
    }
  }
)

leaderboardRouter.post(
  '/:teamName',
  LeaderboardValidator.getByTeam,
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const response = await LeaderboardController.getAllByTeam(
        req.body,
        req.params.teamName
      )
      return res.send(response)
    } catch (e) {
      return next(e)
    }
  }
)

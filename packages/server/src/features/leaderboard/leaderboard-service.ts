import {
  LeaderboardCreateRequest,
  Leaderboard,
  LeaderBoardDataResponse,
  LeaderBoardRequest,
} from './leaderboard-model'
import { OK } from '../../config/types-constants'

class LeaderboardService {
  public async addToLeaderboard(dto: LeaderboardCreateRequest): Promise<OK> {
    await Leaderboard.create({
      ...dto,
    })
    return OK
  }

  public async getAll(
    dto: LeaderBoardRequest
  ): Promise<LeaderBoardDataResponse[]> {
    return await Leaderboard.findAll({
      attributes: ['data'],
      offset: dto.cursor,
      limit: dto.limit,
      where: { ratingFieldName: dto.ratingFieldName },
    })
  }

  public async getAllByTeam(
    dto: LeaderBoardRequest,
    teamName: string
  ): Promise<LeaderBoardDataResponse[]> {
    return await Leaderboard.findAll({
      attributes: ['data'],
      offset: dto.cursor,
      limit: dto.limit,
      where: { teamName, ratingFieldName: dto.ratingFieldName },
    })
  }
}

export default new LeaderboardService()

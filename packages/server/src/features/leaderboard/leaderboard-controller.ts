import {
  Body,
  Controller,
  Path,
  Post,
  Produces,
  Response,
  Route,
  Tags,
} from 'tsoa'
import {
  LeaderboardCreateRequest,
  LeaderBoardDataResponse,
  LeaderBoardRequest,
} from './leaderboard-model'
import LeaderboardService from './leaderboard-service'
import { OK } from '../../config/types-constants'

@Route('leaderboard')
@Tags('Leaderboard')
@Response(400, 'Неверный запрос')
@Response(401, 'Пользователь не авторизован')
@Response(404, 'Результатов не найдено')
@Response(500, 'Что-то пошло не так')
class LeaderboardController extends Controller {
  /** @summary Добавление данных */
  @Post('/')
  @Produces('text/plain')
  public async addToLeaderboard(
    @Body() body: LeaderboardCreateRequest
  ): Promise<OK> {
    return LeaderboardService.addToLeaderboard(body)
  }

  /** @summary Получить все данные по показателю */
  @Post('/all')
  public async getAll(
    @Body() body: LeaderBoardRequest
  ): Promise<LeaderBoardDataResponse[]> {
    return LeaderboardService.getAll(body)
  }

  /** @summary Получить все данные по показателю и названию команды */
  @Post('/{teamName}')
  public async getAllByTeam(
    @Body() body: LeaderBoardRequest,
    @Path() teamName: string
  ): Promise<LeaderBoardDataResponse[]> {
    return LeaderboardService.getAllByTeam(body, teamName)
  }
}

export default new LeaderboardController()

import {
  AreaType,
  PlayerType,
  SIZE,
} from '@pages/page-game/widgets/game/constants'
import { drawUsersAreas } from '@pages/page-game/widgets/game/utils/draw-users-areas'
import { drawUserEnergy } from '@pages/page-game/widgets/game/utils/draw-user-energy'
import { drawDicesSides } from '@pages/page-game/widgets/game/utils/draw-dices-sides'
import { GameState } from '@pages/page-game/widgets/game/type'

type Params = {
  ctx: CanvasRenderingContext2D
  playersCount: number
  currentPlayerEnergy: number
  currentPlayerType: PlayerType
  players: PlayerType[]
  gameState: GameState
}

export const clearContext = (params: Params) => {
  const {
    ctx,
    playersCount,
    currentPlayerType,
    currentPlayerEnergy,
    gameState,
    players,
  } = params
  // Очистка холста перед отрисовкой
  ctx.clearRect(0, 0, SIZE.GAME.WIDTH, SIZE.GAME.HEIGHT)

  // Отрисовка полей для игроков (1 слой)
  drawUsersAreas(ctx, playersCount)

  // Отрисовка энергии текущего игрока (2 слой)
  drawUserEnergy({
    ctx,
    energy: currentPlayerEnergy,
    player: currentPlayerType,
  })

  // Отрисовка кубиков для каждой зоны каждого игрока (3 слой)
  players.forEach(playerType => {
    ;[AreaType.Rest, AreaType.Preparation, AreaType.Attack].forEach(
      areaType => {
        const dices = gameState?.[playerType]?.[areaType]
        if (!dices)
          throw new Error(
            `Game: gameState?.[${playerType}]?.[${areaType}] is undefined`
          )

        drawDicesSides({
          ctx,
          dices,
          area: areaType,
          player: playerType,
        })
      }
    )
  })
}

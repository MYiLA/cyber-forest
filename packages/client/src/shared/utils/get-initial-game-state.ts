import { DiceType } from '@shared/type'
import { createDice } from '@pages/page-game/utils/create-dice'
import {
  AreaType,
  DEFAULT_SETTING,
  PlayerType,
} from '../../pages/page-game/widgets/game/constants'
import { GameState } from '../../pages/page-game/widgets/game/type'

type getInitialGameStateProps = {
  playersCount?: number
  users: string[]
}

export const getInitialGameState = ({
  playersCount = DEFAULT_SETTING.PLAYERS_COUNT,
  users,
}: getInitialGameStateProps): GameState => {
  const playersTypes = [
    PlayerType.Red,
    PlayerType.Blue,
    PlayerType.Yellow,
    PlayerType.Green,
  ].slice(0, playersCount)

  const mappingPlayers = playersTypes
    .map((type, index) => ({
      ...DEFAULT_SETTING.PLAYER,
      name: users[index],
      type,
      [AreaType.Stock]: Array(4)
        .fill(null)
        .map(() => createDice(DiceType.Cat)),
    }))
    .reduce((acc, player) => ({ ...acc, [player.type]: player }), {})

  return mappingPlayers as GameState
}

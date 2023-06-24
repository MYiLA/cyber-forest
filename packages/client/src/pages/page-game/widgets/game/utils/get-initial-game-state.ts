import { createDice } from '@pages/page-game/utils/create-dice'
import { DEFAULT_SETTING, DiceType, PlayerType } from '../constants'
import { GameState } from '../type'

type getInitialGameStateProps = {
  playersCount?: number
}

export const getInitialGameState = ({
  playersCount = DEFAULT_SETTING.PLAYERS_COUNT,
}: getInitialGameStateProps): GameState => {
  const playersTypes = [
    PlayerType.Red,
    PlayerType.Blue,
    PlayerType.Yellow,
    PlayerType.Green,
  ].slice(0, playersCount)

  const mappingPlayers = playersTypes
    .map(type => ({
      ...DEFAULT_SETTING.PLAYER,
      type,
      stock: Array(4)
        .fill(null)
        .map(() => createDice(DiceType.Cat)),
    }))
    .reduce((acc, player) => ({ ...acc, [player.type]: player }), {})

  return mappingPlayers as GameState
}

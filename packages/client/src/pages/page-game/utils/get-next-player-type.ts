import { PlayerType } from '../widgets/game/constants'

export const getNextPlayerType = (
  currentPlayer: PlayerType,
  playersCount: number
) => {
  if (playersCount < 2 || playersCount > 4) {
    throw new Error(
      'getNextPlayerType: общее количество игроков не должно быть меньше 2 и больше 4'
    )
  }
  switch (currentPlayer) {
    case PlayerType.Red:
      return PlayerType.Blue
    case PlayerType.Blue:
      return playersCount === 2 ? PlayerType.Red : PlayerType.Yellow
    case PlayerType.Yellow:
      return playersCount === 3 ? PlayerType.Red : PlayerType.Green
    case PlayerType.Green:
      return PlayerType.Red
    default:
      throw new Error('getNextPlayerType: не найдет такой тип игрока')
  }
}

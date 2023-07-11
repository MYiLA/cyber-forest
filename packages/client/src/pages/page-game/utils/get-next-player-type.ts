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
      if (playersCount === 2) {
        return PlayerType.Red
      }
      return PlayerType.Yellow
    case PlayerType.Yellow:
      if (playersCount === 3) {
        return PlayerType.Red
      }
      return PlayerType.Green
    case PlayerType.Green:
      return PlayerType.Red
    default:
      throw new Error('getNextPlayerType: не найдет такой тип игрока')
  }
}

import { PlayerType } from '../constants'
import { getPlayerPosition } from './get-player-position'

export const getPlayerByPoint = (x: number, y: number): PlayerType | null => {
  const redPlayerPosition = getPlayerPosition(PlayerType.Red)
  // Клик внутри зоны красного игрока?
  if (
    x >= redPlayerPosition.minX &&
    x <= redPlayerPosition.maxX &&
    y >= redPlayerPosition.minY &&
    y <= redPlayerPosition.maxY
  ) {
    return PlayerType.Red
  }

  const bluePlayerPosition = getPlayerPosition(PlayerType.Blue)
  // Клик внутри зоны синего игрока?
  if (
    x >= bluePlayerPosition.minX &&
    x <= bluePlayerPosition.maxX &&
    y >= bluePlayerPosition.minY &&
    y <= bluePlayerPosition.maxY
  ) {
    return PlayerType.Blue
  }

  const yellowPlayerPosition = getPlayerPosition(PlayerType.Yellow)
  // Клик внутри зоны желтого игрока?
  if (
    x >= yellowPlayerPosition.minX &&
    x <= yellowPlayerPosition.maxX &&
    y >= yellowPlayerPosition.minY &&
    y <= yellowPlayerPosition.maxY
  ) {
    return PlayerType.Yellow
  }

  const greenPlayerPosition = getPlayerPosition(PlayerType.Green)
  // Клик внутри зоны зелёного игрока?
  if (
    x >= greenPlayerPosition.minX &&
    x <= greenPlayerPosition.maxX &&
    y >= greenPlayerPosition.minY &&
    y <= greenPlayerPosition.maxY
  ) {
    return PlayerType.Green
  }

  return null
}

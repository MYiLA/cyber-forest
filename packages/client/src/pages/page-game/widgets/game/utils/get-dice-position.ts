/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AreaType,
  AREA_SIZE,
  DICE_INDENT,
  DICE_SIZE,
  PlayerType,
} from '../constants'
import { getAreaPosition } from './get-area-position'

export type GetDicePositionProps = {
  area: AreaType
  player: PlayerType
  diceIndex: number
}

const getColAndRow = (area: AreaType, diceIndex: number) => {
  if (area === AreaType.Attack) {
    // У зоны атаки только одна строка, переносов не происходит
    return {
      col: diceIndex,
      row: 0,
    }
  }

  // Количество кубиков в строке
  let dicesPerRow = 1

  if (area === AreaType.Rest) {
    dicesPerRow = 5
  }

  if (area === AreaType.Preparation) {
    dicesPerRow = 4
  }

  return {
    col: diceIndex % dicesPerRow,
    row: Math.floor(diceIndex / dicesPerRow),
  }
}

export const getDicePosition = ({
  area,
  player,
  diceIndex,
}: GetDicePositionProps) => {
  const { minX, minY } = getAreaPosition(player, area)
  const { col, row } = getColAndRow(area, diceIndex)

  // Расчёт координаты относительно номера столбца
  const ordinalColMultiplier = (DICE_SIZE + DICE_INDENT) * col

  // Расчёт координаты относительно номера строки
  const ordinalRowMultiplier = (DICE_SIZE + DICE_INDENT) * row

  const startX = minX + AREA_SIZE.INDENT + ordinalColMultiplier
  const startY = minY + AREA_SIZE.INDENT + ordinalRowMultiplier

  return {
    minX: startX,
    maxX: startX + DICE_SIZE,
    minY: startY,
    maxY: startY + DICE_SIZE,
  }
}

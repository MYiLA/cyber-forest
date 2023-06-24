import {
  AreaType,
  AREA_SIZE,
  DICE_INDENT,
  DICE_SIZE,
  PlayerType,
} from '../constants'
import {
  DiceSide,
  DiceSideEnergy,
  DiceSideSymbol,
  DiceSideWarrior,
} from '../type'
import { getAreaPosition } from './get-area-position'

const isEnergy = (obj: any): obj is DiceSideEnergy => {
  return obj.energyCount !== undefined
}

const isWarrior = (obj: any): obj is DiceSideWarrior => {
  return obj.image !== undefined
}

const isSymbol = (obj: any): obj is DiceSideSymbol => {
  return obj.specialAbilitySymbol !== undefined
}

const drawDiceSide = ({
  ctx,
  diceSide,
  x,
  y,
}: {
  ctx: CanvasRenderingContext2D
  diceSide: DiceSide
  x: number
  y: number
}): void => {
  ctx.strokeStyle = `rgb(226, 176, 255)`
  if (isEnergy(diceSide)) {
    ctx.fillStyle = `rgb(${diceSide.color})`

    ctx.strokeRect(x, y, DICE_SIZE, DICE_SIZE)
    ctx.fillRect(x, y, DICE_SIZE, DICE_SIZE)
  } else if (isWarrior(diceSide)) {
    ctx.fillStyle = `rgb(41, 36, 52)`

    ctx.strokeRect(x, y, DICE_SIZE, DICE_SIZE)
    ctx.fillRect(x, y, DICE_SIZE, DICE_SIZE)
  } else if (isSymbol(diceSide)) {
    ctx.fillStyle = `rgb(${diceSide.color})`

    ctx.strokeRect(x, y, DICE_SIZE, DICE_SIZE)
    ctx.fillRect(x, y, DICE_SIZE, DICE_SIZE)
  }
}

export const drawDicesSides = ({
  ctx,
  sides,
  player,
  area,
}: {
  ctx: CanvasRenderingContext2D
  sides: DiceSide[]
  player: PlayerType
  area: AreaType
}): void => {
  const { x, y } = getAreaPosition(player, area)

  let startX = x + AREA_SIZE.INDENT
  let startY = y + AREA_SIZE.INDENT

  sides.forEach((diceSide, index) => {
    drawDiceSide({ ctx, diceSide, x: startX, y: startY })
    startX += DICE_SIZE + DICE_INDENT

    // Переход на следующую строку
    if (
      (area === AreaType.Rest &&
        (index === 4 || index === 9 || index === 14)) ||
      (area === AreaType.Preparation &&
        (index === 3 || index === 7 || index === 11))
    ) {
      startY += DICE_SIZE + DICE_INDENT
      startX = x + AREA_SIZE.INDENT
    }
  })
}

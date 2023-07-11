import { isEnergyDiceSide } from '@shared/utils/is-energy-dice-side'
import { isSymbolDiceSide } from '@shared/utils/is-symbol-dice-side'
import { isWarriorDiceSide } from '@shared/utils/is-warrior-dice-side'
import {
  AreaType,
  DICE_NUMBER_INDENT,
  DICE_SIZE,
  PlayerType,
} from '../constants'
import { DiceSide } from '../type'
import { getDicePosition } from './get-dice-position'

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
  if (isEnergyDiceSide(diceSide)) {
    ctx.fillStyle = `rgb(${diceSide.color})`

    ctx.strokeRect(x, y, DICE_SIZE, DICE_SIZE)
    ctx.fillRect(x, y, DICE_SIZE, DICE_SIZE)
  } else if (isWarriorDiceSide(diceSide)) {
    ctx.fillStyle = `rgb(41, 36, 52)`

    ctx.strokeRect(x, y, DICE_SIZE, DICE_SIZE)
    ctx.fillRect(x, y, DICE_SIZE, DICE_SIZE)
    // Отрисовка показателей
    // Цвет и стиль текста
    ctx.fillStyle = '#FFF'
    ctx.font = 'regular 16px Times' // 'New Zelek', Times, serif
    ctx.textAlign = 'right'
    // Отрисовка уровня
    const level = String(diceSide.level)
    ctx.fillText(level, x + DICE_NUMBER_INDENT, y + DICE_NUMBER_INDENT)
    // Отрисовка спецсимвола
    const abilitySymbol = diceSide.abilitySymbol ?? ''
    ctx.fillText(
      abilitySymbol,
      x + DICE_NUMBER_INDENT,
      y + DICE_SIZE - DICE_NUMBER_INDENT
    )

    ctx.textAlign = 'left'
    // Отрисовка атаки
    const attack = String(diceSide.attack)
    ctx.fillText(
      attack,
      x + DICE_SIZE - DICE_NUMBER_INDENT,
      y + DICE_NUMBER_INDENT
    )
    // Отрисовка защиты
    const defense = String(diceSide.defense)
    ctx.fillText(
      defense,
      x + DICE_SIZE - DICE_NUMBER_INDENT,
      y + DICE_SIZE - DICE_NUMBER_INDENT
    )
  } else if (isSymbolDiceSide(diceSide)) {
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
  sides.forEach((diceSide, index) => {
    const { minX, minY } = getDicePosition({ area, player, diceIndex: index })
    drawDiceSide({ ctx, diceSide, x: minX, y: minY })
  })
}

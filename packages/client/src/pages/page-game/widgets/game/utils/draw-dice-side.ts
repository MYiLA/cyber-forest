import { isEnergyDiceSide } from '@shared/utils/is-energy-dice-side'
import { isSymbolDiceSide } from '@shared/utils/is-symbol-dice-side'
import { isWarriorDiceSide } from '@shared/utils/is-warrior-dice-side'
import { DICE_SIZE } from '../constants'
import { DiceSide } from '../type'
import { drawEnergy, drawWarrior } from './drawers'

type DrawDiceOptions = {
  ctx: CanvasRenderingContext2D
  diceSide: DiceSide
  x: number
  y: number
}

export const drawDiceSide = (options: DrawDiceOptions): void => {
  const { diceSide, x, y, ctx } = options
  ctx.strokeStyle = `rgb(226, 176, 255)`
  if (isEnergyDiceSide(diceSide)) {
    drawEnergy(ctx, { diceSide, x, y })
    return
  }
  if (isWarriorDiceSide(diceSide)) {
    ctx.font = 'regular 16px Times'
    drawWarrior(ctx, { diceSide, x, y })
    return
  }
  if (isSymbolDiceSide(diceSide)) {
    ctx.fillStyle = `rgb(${diceSide.color})`
    ctx.fillRect(x, y, DICE_SIZE, DICE_SIZE)
    ctx.fillStyle = `rgb(${diceSide.textColor})`
    ctx.font = '400 40px New Zelek'
    ctx.fillText(
      diceSide.specialAbilitySymbol,
      x + DICE_SIZE - 15,
      y + DICE_SIZE / 2 + 15
    )
    ctx.strokeRect(x, y, DICE_SIZE, DICE_SIZE)
    return
  }
  throw new Error('Unknown DiceSide')
}

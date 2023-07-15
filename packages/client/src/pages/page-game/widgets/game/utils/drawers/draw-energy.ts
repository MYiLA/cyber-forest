import { DiceSideEnergy } from '@shared/type'
import {
  DICE_NUMBER_INDENT,
  DICE_SIZE,
} from '@pages/page-game/widgets/game/constants'
import { energySvg } from './energy-svg'
import { getImageFromSvg, parseSVGStringToHTMLElement } from '@utils/svg'

type Option = {
  diceSide: DiceSideEnergy
  x: number
  y: number
}

export const drawEnergy = async (
  ctx: CanvasRenderingContext2D,
  option: Option
) => {
  const { y, x, diceSide } = option
  const svgElement = parseSVGStringToHTMLElement(energySvg)
  if (!svgElement) return
  const fillEl = svgElement.querySelector('.fillSelector')
  const strokeEl = svgElement.querySelector('.strokeSelector')
  fillEl?.setAttribute('fill', `rgb(${diceSide.textColor})`)
  strokeEl?.setAttribute('stroke', `rgb(${diceSide.textColor})`)
  ctx.strokeStyle = '#ffffff'

  ctx.fillStyle = `rgb(${diceSide.color})`
  ctx.fillRect(x, y, DICE_SIZE, DICE_SIZE)
  // ctx.strokeRect(x, y, DICE_SIZE, DICE_SIZE)
  const image = await getImageFromSvg(svgElement)
  ctx.drawImage(image, x, y, DICE_SIZE, DICE_SIZE)
  // Отрисовка показателей
  // Цвет и стиль текста
  // Отрисовка энергии
  const level = diceSide.energyCount.toString()
  ctx.textAlign = 'right'
  ctx.font = '400 20px New Zelek' // 'New Zelek', Times, serif
  ctx.fillStyle = `rgb(${diceSide.textColor})`
  ctx.fillText(level, x + DICE_NUMBER_INDENT + 10, y + DICE_NUMBER_INDENT + 15)
}

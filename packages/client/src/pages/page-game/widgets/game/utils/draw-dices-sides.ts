import { AreaType, PlayerType } from '../constants'
import { DiceSide } from '../type'
import { getDicePosition } from './get-dice-position'
import { rollDice } from '@pages/page-game/widgets/game/utils/animation'

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
    rollDice(`${minX}${minY}`, {
      area,
      lastSide: diceSide,
      ctx,
      minX,
      minY,
    })
  })
}

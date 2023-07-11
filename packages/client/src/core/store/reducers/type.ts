import { Dice } from '@pages/page-game/type'
import { AreaType, PlayerType } from '@pages/page-game/widgets/game/constants'

export type DicesInAreaPayload = {
  dices: Dice[]
  areaType: AreaType
  playerType: PlayerType
}

export type IncreaseGloryPayload = {
  playerType: PlayerType
  gloryCount: number
}

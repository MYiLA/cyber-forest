import { DiceSideEnergy, DiceSideSymbol, DiceSideWarrior } from '@shared/type'
import { Player } from '../../type'
import { PlayerType } from './constants'

export type DiceSide = DiceSideEnergy | DiceSideWarrior | DiceSideSymbol

/** Состояние игры */
export type GameState = {
  /** Состояние красного игрока. Он всегда должен быть */
  [PlayerType.Red]: Player | null
  /** Состояние синего игрока. Он всегда должен быть */
  [PlayerType.Blue]: Player | null
  /** Состояние зелёного игрока */
  [PlayerType.Green]?: Player | null
  /** Состояние жёлтого игрока */
  [PlayerType.Yellow]?: Player | null
}

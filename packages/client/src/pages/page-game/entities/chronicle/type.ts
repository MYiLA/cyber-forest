import { PlayerType } from '../../widgets/game/constants'

export type ChronicleMessage = {
  id: number
  player: {
    id: string
    type: PlayerType
    gloryCount: number
  }
  desc: string
}

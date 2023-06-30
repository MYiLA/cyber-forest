import { Player } from '../../type'

export type ChronicleMessage = {
  id: number
  player: Partial<Player>
  desc: string
}

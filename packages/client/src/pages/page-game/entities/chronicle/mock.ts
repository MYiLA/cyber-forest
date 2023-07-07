import { PlayerType } from '../../widgets/game/constants'
import { ChronicleMessage } from './type'

export const MESSAGES: ChronicleMessage[] = [
  {
    id: 1,
    player: {
      id: '1',
      type: PlayerType.Red,
      gloryCount: 0,
    },
    desc: 'Игрок 1 нанял зайца и выставил усиленного медведя на поле боя. Медведь нанёс всем зверям 8 урона',
  },
  {
    id: 2,
    player: {
      id: '2',
      type: PlayerType.Yellow,
      gloryCount: 20,
    },
    desc: 'Лиса игрока 2 отправляется на отдых',
  },
  {
    id: 3,
    player: {
      id: '3',
      type: PlayerType.Green,
      gloryCount: 20,
    },
    desc: 'Жаба игрока 3 отправляется на отдых',
  },
]

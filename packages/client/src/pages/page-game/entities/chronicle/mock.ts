import { DICES_LIB } from '../../constants'
import { PlayerType } from '../../widgets/game/constants'
import { ChronicleMessage } from './type'

export const MESSAGES: ChronicleMessage[] = [
  {
    id: 1,
    player: {
      id: '1',
      type: PlayerType.Red,
      gloryCount: 0,
      isActive: true,
      stock: [DICES_LIB.CAT, DICES_LIB.CAT, DICES_LIB.CAT, DICES_LIB.CAT],
    },
    desc: 'Игрок 1 нанял зайца и выставил усиленного медведя на поле боя. Медведь нанёс всем зверям 8 урона',
  },
  {
    id: 2,
    player: {
      id: '2',
      type: PlayerType.Yellow,
      gloryCount: 20,
      isActive: false,
      stock: [DICES_LIB.CAT, DICES_LIB.CAT, DICES_LIB.CAT, DICES_LIB.CAT],
    },
    desc: 'Лиса игрока 2 отправляется на отдых',
  },
]

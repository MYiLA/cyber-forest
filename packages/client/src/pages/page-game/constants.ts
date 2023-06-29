import cat from '@images/warriors/cat.png'
import { Dice } from './type'
import { DiceType } from './widgets/game/constants'

const CAT_COLOR = '213, 150, 37'
const CAT_TEXT_COLOR = '42, 46, 56'

export const DICES_LIB: Record<string, Dice> = {
  [DiceType.Cat]: {
    id: '1',
    type: DiceType.Cat,
    sides: [
      {
        color: CAT_COLOR,
        textColor: CAT_TEXT_COLOR,
        energyCount: 1,
      },
      {
        color: CAT_COLOR,
        textColor: CAT_TEXT_COLOR,
        energyCount: 1,
      },
      {
        color: CAT_COLOR,
        textColor: CAT_TEXT_COLOR,
        energyCount: 1,
      },
      {
        color: CAT_COLOR,
        textColor: CAT_TEXT_COLOR,
        specialAbilitySymbol: '?',
      },
      {
        image: cat,
        attack: 1,
        defense: 2,
        level: 1,
      },
      {
        image: cat,
        attack: 1,
        defense: 2,
        level: 1,
      },
    ],
    abilities: [
      {
        desc: 'Перебросьте этот кубик + 1 кубик на ваш выбор из зоны подготовки',
        abilitySymbol: '?',
      },
    ],
    cost: 1,
    glory: 1,
    activeSide: null,
  },
}

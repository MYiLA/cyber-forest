import { getRandomElement } from '@shared/utils/getRandomElement'
import { DICES_LIB } from '../constants'
import { DEFAULT_SETTING, DiceType } from '../widgets/game/constants'

export const createForest = () => {
  const result: string[] = [DiceType.Cat]
  const allCardTypes = Object.keys(DICES_LIB)

  while (result.length < DEFAULT_SETTING.CARDS_TYPES_COUNT) {
    const cardType = getRandomElement(allCardTypes)
    if (!result.includes(cardType)) {
      result.push(cardType)
    }
  }

  // Сортируем воинов по стоимости. От дешёвого к дорогому
  return result
    .map(type => DICES_LIB[type])
    .sort((item1, item2) => Number(item1.cost) - Number(item2.cost))
}

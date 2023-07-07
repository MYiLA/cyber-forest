import { DEFAULT_SETTING } from '@pages/page-game/widgets/game/constants'
import { AccessHireWarrior, DiceType } from '@shared/type'
import { getRandomElement } from '@shared/utils/get-random-element'

export const getAccessHireWarriors = (
  cardsTypesCount = DEFAULT_SETTING.CARDS_TYPES_COUNT
): AccessHireWarrior[] => {
  const result: DiceType[] = [DiceType.Cat]
  const allCardTypes = Object.keys(DiceType) as DiceType[]

  while (result.length < cardsTypesCount) {
    const cardType = getRandomElement(allCardTypes)
    if (!result.includes(cardType)) {
      result.push(cardType)
    }
  }

  // Каждый тип воина можно нанять ограниченное количество раз
  return result.map(type => {
    // Изначально базовых воинов в киберлесу нанять нельзя
    if (type === DiceType.Cat) {
      return {
        type,
        count: 0,
      }
    }

    return {
      type,
      count: DEFAULT_SETTING.MAX_HIRE_WARRIOR_COUNT,
    }
  })
}

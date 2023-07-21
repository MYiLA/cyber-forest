import { AccessHireWarrior } from '@shared/type'
import { DICES_LIB } from '../constants'

/** Создаёт киберлес из списка воинов, доступных для найма */
export const createForest = (accessHireWarrior: AccessHireWarrior[]) => {
  return (
    accessHireWarrior
      .map(item => DICES_LIB[item.type])
      // Сортируем воинов по стоимости. От дешёвого к дорогому
      .sort((item1, item2) => Number(item1.cost) - Number(item2.cost))
  )
}

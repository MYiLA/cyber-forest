import { DiceType } from '@shared/type'
import { v4 as uuid4 } from 'uuid'
import { DICES_LIB } from '../constants'

export const createDice = (type: DiceType) => {
  const id = uuid4()
  return { ...DICES_LIB[type], id }
}

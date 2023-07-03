import { DiceSideWarrior } from '../type'

export const isWarriorDiceSide = (obj: any): obj is DiceSideWarrior => {
  return obj?.image !== undefined
}

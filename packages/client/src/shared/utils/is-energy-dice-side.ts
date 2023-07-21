import { DiceSideEnergy } from '../type'

export const isEnergyDiceSide = (obj: any): obj is DiceSideEnergy => {
  return obj?.energyCount !== undefined
}

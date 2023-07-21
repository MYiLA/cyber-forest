import { DiceSideSymbol } from '../type'

export const isSymbolDiceSide = (obj: any): obj is DiceSideSymbol => {
  return obj?.specialAbilitySymbol !== undefined
}

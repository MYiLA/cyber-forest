import { AREA_SIZE, AreaType } from '../constants'

export const getAreaSize = (areaType: AreaType) => {
  if (areaType === AreaType.Stock) {
    throw new Error('getAreaPosition: Инвентаря нет в канвасе')
  }

  return {
    width: AREA_SIZE[areaType].WIDTH,
    height: AREA_SIZE[areaType].HEIGHT,
  }
}

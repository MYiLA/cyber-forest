import { AREA_SIZE, AreaType } from '../constants'

export const getAreaSize = (areaType: AreaType) => {
  return {
    width: AREA_SIZE[areaType].WIDTH,
    height: AREA_SIZE[areaType].HEIGHT,
  }
}

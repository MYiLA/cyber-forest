import { AREA_POSITION, AreaType, PlayerType } from '../constants'

export const getAreaPosition = (player: PlayerType, areaType: AreaType) => {
  return {
    x: AREA_POSITION[player][areaType].x,
    y: AREA_POSITION[player][areaType].y,
  }
}

import { AREA_POSITION, AreaType, PlayerType } from "../constants";
import { getAreaSize } from "./get-area-size";

export const getAreaPosition = (player: PlayerType, areaType: AreaType) => {
  if (areaType === AreaType.Stock) {
    throw new Error("getAreaPosition: Инвентаря нет в канвасе");
  }

  const minX = AREA_POSITION[player][areaType].x;
  const minY = AREA_POSITION[player][areaType].y;
  const areaSize = getAreaSize(areaType);

  return {
    minX,
    maxX: minX + areaSize.width,
    minY,
    maxY: minY + areaSize.height,
  };
};

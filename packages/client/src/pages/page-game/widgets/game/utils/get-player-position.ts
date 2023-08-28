import { AreaType, AREA_POSITION, PlayerType } from "../constants";
import { getPlayerSize } from "./get-player-size";

export const getPlayerPosition = (playerType: PlayerType) => {
  const playerSize = getPlayerSize();
  let minX = null;
  let minY = null;

  if (playerType === PlayerType.Red || playerType === PlayerType.Yellow) {
    minX = AREA_POSITION[playerType][AreaType.Rest].x;
    minY = AREA_POSITION[playerType][AreaType.Rest].y;
  } else if (playerType === PlayerType.Blue) {
    minX = AREA_POSITION[playerType][AreaType.Preparation].x;
    minY = AREA_POSITION[playerType][AreaType.Preparation].y;
  } else if (playerType === PlayerType.Green) {
    minX = AREA_POSITION[playerType][AreaType.Attack].x;
    minY = AREA_POSITION[playerType][AreaType.Attack].y;
  }

  if (minX === null || minY === null) {
    throw new Error(`getPlayerPosition: не найден игрок типа ${playerType}`);
  }

  return {
    minX,
    maxX: minX + playerSize.width,
    minY,
    maxY: minY + playerSize.height,
  };
};

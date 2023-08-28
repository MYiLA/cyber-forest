import { AreaType, PlayerType } from "../constants";
import { getAreaPosition } from "./get-area-position";

export const getAreaByPoint = ({
  playerType,
  x,
  y,
}: {
  playerType: PlayerType;
  x: number;
  y: number;
}): AreaType | null => {
  // Клик внутри зоны атаки?
  const attackPosition = getAreaPosition(playerType, AreaType.Attack);
  if (
    x >= attackPosition.minX &&
    x <= attackPosition.maxX &&
    y >= attackPosition.minY &&
    y <= attackPosition.maxY
  ) {
    return AreaType.Attack;
  }

  // Клик внутри зоны отдыха?
  const restPosition = getAreaPosition(playerType, AreaType.Rest);
  if (
    x >= restPosition.minX &&
    x <= restPosition.maxX &&
    y >= restPosition.minY &&
    y <= restPosition.maxY
  ) {
    return AreaType.Rest;
  }

  // Клик внутри зоны подготовки?
  const preparationPosition = getAreaPosition(playerType, AreaType.Preparation);
  if (
    x >= preparationPosition.minX &&
    x <= preparationPosition.maxX &&
    y >= preparationPosition.minY &&
    y <= preparationPosition.maxY
  ) {
    return AreaType.Preparation;
  }

  return null;
};

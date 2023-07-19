import { Dice } from "@pages/page-game/type";
import { AreaType, PlayerType } from "../constants";
import { getDicePosition } from "./get-dice-position";

export const getDiceByPoint = ({
  playerType,
  area,
  dices,
  x,
  y,
}: {
  playerType: PlayerType;
  area: AreaType;
  x: number;
  y: number;
  dices: Dice[];
}): Dice | undefined => {
  // Находим кубик, внутри которого находятся переданные координаты
  const result = dices.find((dice, index) => {
    const { maxX, maxY, minX, minY } = getDicePosition({
      area,
      player: playerType,
      diceIndex: index,
    });
    if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
      return true;
    }
  });

  return result;
};

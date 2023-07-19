import { rollDice } from "@pages/page-game/widgets/game/utils/animation";
import { Dice } from "@pages/page-game/type";
import { AreaType, PlayerType } from "../constants";
import { getDicePosition } from "./get-dice-position";

export const drawDicesSides = ({
  ctx,
  dices,
  player,
  area,
}: {
  ctx: CanvasRenderingContext2D;
  dices: Dice[];
  player: PlayerType;
  area: AreaType;
}): void => {
  dices.forEach(({ sides, activeSide }, index) => {
    if (activeSide === null)
      throw new Error("drawDicesSides: activeSide === null");
    const { minX, minY } = getDicePosition({ area, player, diceIndex: index });
    rollDice(`${minX}${minY}`, {
      area,
      lastSide: activeSide,
      sides,
      ctx,
      minX,
      minY,
    });
  });
};

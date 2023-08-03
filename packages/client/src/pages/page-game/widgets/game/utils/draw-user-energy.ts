import { AreaType, AREA_SIZE, PlayerType } from "../constants";
import { getAreaPosition } from "./get-area-position";

type DrawUserEnergyProps = {
  ctx: CanvasRenderingContext2D;
  energy: number;
  player: PlayerType;
};

export const drawUserEnergy = ({
  ctx,
  energy,
  player,
}: DrawUserEnergyProps): void => {
  // Нахождение координат начала текста в зоне подготовки
  const { maxX, maxY } = getAreaPosition(player, AreaType.Preparation);
  const x = maxX - AREA_SIZE.INDENT;
  const y = maxY - AREA_SIZE.INDENT;
  // Цвет и стиль текста
  ctx.fillStyle = "#FFF";
  ctx.textAlign = "right";
  ctx.font = "14px New Zelek";
  // Отрисовка
  ctx.fillText(`Сила: ${energy}`, x, y);
};

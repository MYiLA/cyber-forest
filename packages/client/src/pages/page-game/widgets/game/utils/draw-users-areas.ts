import {
  AREA_POSITION,
  AREA_SIZE,
  RGB_COLOR,
  AreaType,
  PlayerType,
} from "../constants";

const drawUserArea = ({
  ctx,
  player,
}: {
  ctx: CanvasRenderingContext2D;
  player: PlayerType;
}): void => {
  ctx.fillStyle = `rgba(${RGB_COLOR[player]}, .03)`;
  ctx.strokeStyle = `rgb(${RGB_COLOR[player]})`;

  Object.values(AreaType).forEach((area) => {
    if (area === AreaType.Stock) return;
    ctx.strokeRect(
      AREA_POSITION[player][area].x,
      AREA_POSITION[player][area].y,
      AREA_SIZE[area].WIDTH,
      AREA_SIZE[area].HEIGHT
    );
    ctx.fillRect(
      AREA_POSITION[player][area].x,
      AREA_POSITION[player][area].y,
      AREA_SIZE[area].WIDTH,
      AREA_SIZE[area].HEIGHT
    );
  });
};

export const drawUsersAreas = (
  ctx: CanvasRenderingContext2D,
  playersCount = 4
): void => {
  if (playersCount < 2 || playersCount > 4) {
    throw new Error("drawUsersAreas: Игроков должно быть от 2 до 4 штук");
  }

  // Рисую красное поле
  drawUserArea({
    ctx,
    player: PlayerType.Red,
  });

  // Рисую синее поле
  drawUserArea({
    ctx,
    player: PlayerType.Blue,
  });

  if (playersCount >= 3) {
    // Рисую желтое поле
    drawUserArea({
      ctx,
      player: PlayerType.Yellow,
    });
  }

  if (playersCount === 4) {
    // Рисую зелёное поле
    drawUserArea({
      ctx,
      player: PlayerType.Green,
    });
  }
};

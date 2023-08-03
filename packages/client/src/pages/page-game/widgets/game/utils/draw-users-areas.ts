import {
  AREA_POSITION,
  AREA_SIZE,
  AREA_ICON,
  AREA_ICON_TYPE,
  AREA_ICON_COLOR,
  RGB_COLOR,
  AreaType,
  PlayerType,
} from "../constants";
import { GameState } from "../type";

import { getAreaSize } from "./get-area-size";

const drawUserArea = ({
  ctx,
  player,
  playerName,
}: {
  ctx: CanvasRenderingContext2D;
  player: PlayerType;
  playerName: string;
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

    drawAreaAngleIcons(ctx, player, area);
    drawAreaText(ctx, player, area, playerName);
  });
};

// Подпись для игровой области
const drawAreaText = (
  ctx: CanvasRenderingContext2D,
  player: PlayerType,
  area: AreaType.Preparation | AreaType.Attack | AreaType.Rest,
  playerName: string
) => {
  const areaSize = getAreaSize(area);

  ctx.fillStyle = "#FFF";
  ctx.font = "14px New Zelek";
  ctx.textAlign = "left";

  let areaText = "";
  switch (area) {
    case AreaType.Preparation:
      areaText = `Подготовка`;
      break;
    case AreaType.Rest:
      areaText = `Отдых`;
      break;
    default:
      areaText = playerName;
      break;
  }

  ctx.fillText(
    areaText,
    AREA_POSITION[player][area].x + AREA_SIZE.RIGHT_INDENT,
    AREA_POSITION[player][area].y + areaSize.height - AREA_SIZE.INDENT
  );
  ctx.fillStyle = `rgba(${RGB_COLOR[player]}, .03)`;
};

// Отрисовка "уголков" игровых областей
const drawAreaAngleIcons = (
  ctx: CanvasRenderingContext2D,
  player: PlayerType,
  area: AreaType.Preparation | AreaType.Attack | AreaType.Rest
): void => {
  Object.values(AREA_ICON_TYPE).forEach((iconType) => {
    const icon = new Path2D(AREA_ICON[area][iconType].PATH);
    const iconPath = new Path2D();
    const iconXCoordinate =
      iconType === AREA_ICON_TYPE.LBV || iconType === AREA_ICON_TYPE.LBH
        ? AREA_POSITION[player][area].x
        : AREA_POSITION[player][area].x +
          AREA_SIZE[area].WIDTH -
          AREA_ICON[area][iconType].WIDTH;
    const iconYCoordinate =
      iconType === AREA_ICON_TYPE.LBV || iconType === AREA_ICON_TYPE.LBH
        ? AREA_POSITION[player][area].y +
          AREA_SIZE[area].HEIGHT -
          AREA_ICON[area][iconType].HEIGHT
        : AREA_POSITION[player][area].y;
    iconPath.addPath(icon, {
      e: iconXCoordinate,
      f: iconYCoordinate,
    });
    ctx.stroke(iconPath);

    if (iconType === AREA_ICON_TYPE.LBH || iconType === AREA_ICON_TYPE.RT) {
      ctx.fillStyle = `${AREA_ICON_COLOR[player]}`;
      ctx.fill(iconPath);
      ctx.fillStyle = `rgba(${RGB_COLOR[player]}, .03)`;
    }
  });
};

export const drawUsersAreas = (
  ctx: CanvasRenderingContext2D,
  gameState: GameState,
  playersCount = 4
): void => {
  if (playersCount < 2 || playersCount > 4) {
    throw new Error("drawUsersAreas: Игроков должно быть от 2 до 4 штук");
  }

  // Рисую красное поле
  drawUserArea({
    ctx,
    player: PlayerType.Red,
    playerName: gameState[PlayerType.Red]?.name ?? "Игрок 1",
  });

  // Рисую синее поле
  drawUserArea({
    ctx,
    player: PlayerType.Blue,
    playerName: gameState[PlayerType.Blue]?.name ?? "Игрок 2",
  });

  if (playersCount >= 3) {
    // Рисую желтое поле
    drawUserArea({
      ctx,
      player: PlayerType.Yellow,
      playerName: gameState[PlayerType.Yellow]?.name ?? "Игрок 3",
    });
  }

  if (playersCount === 4) {
    // Рисую зелёное поле
    drawUserArea({
      ctx,
      player: PlayerType.Green,
      playerName: gameState[PlayerType.Green]?.name ?? "Игрок 4",
    });
  }
};

import { DiceSideWarrior } from "@shared/type";
import {
  DICE_NUMBER_INDENT,
  DICE_SIZE,
} from "@pages/page-game/widgets/game/constants";
import { loadImage } from "@utils/load-image";

type Option = {
  diceSide: DiceSideWarrior;
  x: number;
  y: number;
};

export const drawWarrior = async (
  ctx: CanvasRenderingContext2D,
  option: Option
) => {
  const { y, x, diceSide } = option;
  const image = await loadImage(diceSide.image);
  image.src = diceSide.image;
  ctx.font = "300 16px Times";
  ctx.drawImage(image, x, y, DICE_SIZE, DICE_SIZE);
  // Отрисовка показателей
  // Цвет и стиль текста
  ctx.fillStyle = "#FFF";
  ctx.textAlign = "right";
  // Отрисовка уровня
  const level = String(diceSide.level);
  ctx.fillText(level, x + DICE_NUMBER_INDENT, y + DICE_NUMBER_INDENT + 5);
  // Отрисовка спецсимвола
  const abilitySymbol = diceSide.abilitySymbol ?? "";
  ctx.fillText(
    abilitySymbol,
    x + DICE_NUMBER_INDENT,
    y + DICE_SIZE - DICE_NUMBER_INDENT
  );

  ctx.textAlign = "left";
  // Отрисовка атаки
  const attack = String(diceSide.attack);
  ctx.fillText(
    attack,
    x + DICE_SIZE - DICE_NUMBER_INDENT,
    y + DICE_NUMBER_INDENT + 5
  );
  // Отрисовка защиты
  const defense = String(diceSide.defense);
  ctx.fillText(
    defense,
    x + DICE_SIZE - DICE_NUMBER_INDENT,
    y + DICE_SIZE - DICE_NUMBER_INDENT
  );
};

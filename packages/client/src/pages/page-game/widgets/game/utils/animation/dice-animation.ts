/* eslint-disable @typescript-eslint/no-unused-vars */
import { animate } from "@utils/animate";
import { AreaType } from "@pages/page-game/widgets/game/constants";
import { drawDiceSide } from "@pages/page-game/widgets/game/utils/draw-dice-side";
import { allSides as allSidesConst } from "@pages/page-game/widgets/game/utils/animation/sides";
import { DiceSide } from "../../type";

type DiceMetaOption = {
  index?: number;
  lastSide: DiceSide;
  willAnimated?: boolean;
};

const diceMeta: Record<string, Required<DiceMetaOption>> = {};
const getInitialDiceOptions = (
  params: DiceMetaOption
): Required<DiceMetaOption> => ({
  lastSide: params.lastSide,
  index: params.index || 0,
  willAnimated: !!params.willAnimated,
});

const DIFF = 0.1;
const TIME_SCALE = 0.5;
const isRounded = (val: number) => {
  const rounded = Math.round(val);
  const min = rounded - DIFF;
  const max = rounded + DIFF;
  return val > min && val < max;
};

type RollDiceOptions = {
  ctx: CanvasRenderingContext2D;
  lastSide: DiceSide;
  area: AreaType;
  sides: DiceSide[];
  minX: number;
  minY: number;
};

export const rollDice = (diceKey: string, options: RollDiceOptions) => {
  const { minY, minX, ctx, lastSide } = options;
  // TODO: поправить и отрефачить анимацию. Сейчас она ломает механику
  // if (!diceMeta[diceKey]) {
  //   diceMeta[diceKey] = getInitialDiceOptions({ lastSide })
  // }

  // const dice = diceMeta[diceKey]
  // if (area === AreaType.Preparation && !dice.willAnimated) {
  //   animate({
  //     update({ stopAnimation }) {
  //       const indexSide = dice.index
  //       if (indexSide <= sides.length) {
  //         dice.index += DIFF * TIME_SCALE
  //       } else {
  //         stopAnimation()
  //       }
  //     },
  //     render() {
  //       const idx = dice.index
  //       if (!isRounded(idx)) {
  //         return
  //       }
  //       const roundedIndex = Math.round(idx)
  //       if (roundedIndex < sides.length) {
  //         const side = sides[roundedIndex]
  //         drawDiceSide({ ctx, diceSide: side, x: minX, y: minY })
  //       }
  //       if (roundedIndex === sides.length) {
  //         dice.willAnimated = true
  //         drawDiceSide({ ctx, diceSide: dice.lastSide, x: minX, y: minY })
  //       }
  //     },
  //   })
  //   return
  // }
  drawDiceSide({ ctx, diceSide: lastSide, x: minX, y: minY });
};

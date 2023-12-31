import { DiceType } from "@shared/type";
import { DiceSide } from "./widgets/game/type";
import { PlayerType, AreaType } from "./widgets/game/constants";

/** Способности */
export type Ability = {
  /** Описание способности */
  desc: string;
  /** Символ способности */
  abilitySymbol?: string;
};

/** Кубик */
export type Dice = {
  /** Id кубика */
  id: string;
  /** Тип кубика */
  type: DiceType;
  /** Стороны кубика */
  sides: [DiceSide, DiceSide, DiceSide, DiceSide, DiceSide, DiceSide];
  /** Способности */
  abilities: Ability[];
  /** Стоимость */
  cost: number;
  /** Слава */
  glory: number;
  /** Действующая сторона */
  activeSide: DiceSide | null;
  /** Основное изображение */
  img: string;
  /** Цвет подложки основного изображения */
  bgImg: string;
  /** Имя воина */
  title: string;
  /** Имя воина в винительном падеже */
  accusativeTitle: string;
};

/** Игрок */
export type Player = {
  /** Айди юзера, если есть аккаунт */
  id?: string;
  name: string;
  /** Тип игрока */
  type: PlayerType;
  /** Количество славы */
  gloryCount: number;
  /** Инвентарь */
  [AreaType.Stock]: Dice[];
  /** Зона атаки */
  [AreaType.Attack]: Dice[];
  /** Зона подготовки */
  [AreaType.Preparation]: Dice[];
  /** Зона отдыха */
  [AreaType.Rest]: Dice[];
  /** Порядковый номер текущего хода. Так же это общее количество сделанных ходов за всю игру этим игроком */
  movesCount: number;
  /** */
  isActive: boolean;
};

export type ChoosingAreaCubeProps = {
  area: AreaType;
  playerType: PlayerType;
  dice: Dice;
};

export type ChoosingAreaCubeFunction = (props: ChoosingAreaCubeProps) => void;

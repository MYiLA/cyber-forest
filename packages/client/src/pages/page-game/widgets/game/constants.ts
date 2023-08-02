/* eslint-disable no-unused-vars */
/** Тип игрока */
export enum PlayerType {
  /** Красный игрок (первый) */
  Red = "Red",
  /** Синий игрок (второй) */
  Blue = "Blue",
  /** Желтый игрок (третий) */
  Yellow = "Yellow",
  /** Зелёный игрок (четвёртый) */
  Green = "Green",
}

/** Фазы игры */
export enum PhaseType {
  /** Наполнение инвентаря, выбор воинов из инвентаря */
  Stock = "Stock",
  /** Наём воинов в киберлесу и призыв воинов из зоны подготовки в зону атаки */
  PreparationAndHiring = "PreparationAndHiring",
  /** Атака текущего игрока */
  Attack = "Attack",
  /** Защита при спорной ситуации */
  Defense = "Defense",
  /** Ожидание только в онлайн-игре */
  Waiting = "Waiting",
  /** Подсчёт результатов битвы */
  ResultBattle = "ResultBattle",
}

/** Цвет игрока */
export const RGB_COLOR = {
  [PlayerType.Red]: "255, 75, 75",
  [PlayerType.Blue]: "124, 240, 240",
  [PlayerType.Yellow]: "251, 229, 33",
  [PlayerType.Green]: "0, 255, 10",
};

/** Тип игровой зоны */
export enum AreaType {
  /** Зона атаки */
  Attack = "Attack",
  /** Зона подготовки */
  Preparation = "Preparation",
  /** Зона отдыха */
  Rest = "Rest",
  /** Инвентарь */
  Stock = "Stock",
}

export enum DiceSideType {
  Energy = "Energy",
  Monster = "Monster",
  Symbol = "Symbol",
}

/** Размер игровой зоны */
export const AREA_SIZE = {
  [AreaType.Rest]: {
    WIDTH: 347,
    HEIGHT: 282,
  },
  [AreaType.Preparation]: {
    WIDTH: 283,
    HEIGHT: 170,
  },
  [AreaType.Attack]: {
    WIDTH: 283,
    HEIGHT: 100,
  },
  INDENT: 12,
  RIGHT_INDENT: 16,
};

export const DICE_SIZE = 60;
export const DICE_INDENT = 6;
export const DICE_NUMBER_INDENT = 10;

/** Общие Размеры */
export const SIZE = {
  GAME: {
    WIDTH: 1330,
    HEIGHT: 580,
  },

  FULL_USER_AREA: {
    WIDTH:
      AREA_SIZE[AreaType.Rest].WIDTH +
      AREA_SIZE[AreaType.Attack].WIDTH +
      AREA_SIZE.INDENT,
    HEIGHT: AREA_SIZE[AreaType.Rest].HEIGHT,
  },
};

/** Координаты игровой зоны */
export const AREA_POSITION = {
  [PlayerType.Red]: {
    [AreaType.Attack]: {
      x: AREA_SIZE[AreaType.Rest].WIDTH + AREA_SIZE.INDENT,
      y: AREA_SIZE[AreaType.Preparation].HEIGHT + AREA_SIZE.INDENT,
    },
    [AreaType.Preparation]: {
      x: AREA_SIZE[AreaType.Rest].WIDTH + AREA_SIZE.INDENT,
      y: 0,
    },
    [AreaType.Rest]: {
      x: 0,
      y: 0,
    },
  },
  [PlayerType.Blue]: {
    [AreaType.Attack]: {
      x: SIZE.GAME.WIDTH - SIZE.FULL_USER_AREA.WIDTH,
      y: AREA_SIZE[AreaType.Preparation].HEIGHT + AREA_SIZE.INDENT,
    },
    [AreaType.Preparation]: {
      x: SIZE.GAME.WIDTH - SIZE.FULL_USER_AREA.WIDTH,
      y: 0,
    },
    [AreaType.Rest]: {
      x: SIZE.GAME.WIDTH - AREA_SIZE[AreaType.Rest].WIDTH,
      y: 0,
    },
  },
  [PlayerType.Yellow]: {
    [AreaType.Attack]: {
      x: AREA_SIZE[AreaType.Rest].WIDTH + AREA_SIZE.INDENT,
      y: SIZE.GAME.HEIGHT - SIZE.FULL_USER_AREA.HEIGHT,
    },
    [AreaType.Preparation]: {
      x: AREA_SIZE[AreaType.Rest].WIDTH + AREA_SIZE.INDENT,
      y: SIZE.GAME.HEIGHT - AREA_SIZE[AreaType.Preparation].HEIGHT,
    },
    [AreaType.Rest]: {
      x: 0,
      y: SIZE.GAME.HEIGHT - SIZE.FULL_USER_AREA.HEIGHT,
    },
  },
  [PlayerType.Green]: {
    [AreaType.Attack]: {
      x: SIZE.GAME.WIDTH - SIZE.FULL_USER_AREA.WIDTH,
      y: SIZE.GAME.HEIGHT - SIZE.FULL_USER_AREA.HEIGHT,
    },
    [AreaType.Preparation]: {
      x: SIZE.GAME.WIDTH - SIZE.FULL_USER_AREA.WIDTH,
      y: SIZE.GAME.HEIGHT - AREA_SIZE[AreaType.Preparation].HEIGHT,
    },
    [AreaType.Rest]: {
      x: SIZE.GAME.WIDTH - AREA_SIZE[AreaType.Rest].WIDTH,
      y: SIZE.GAME.HEIGHT - SIZE.FULL_USER_AREA.HEIGHT,
    },
  },
};

/** Тип игры */
export enum GameType {
  /** Оффлайн */
  Offline = "Offline",
  /** Онлайн */
  Online = "Online",
}

/** Дефолтные настройки игры */
export const DEFAULT_SETTING = {
  GAME_TYPE: GameType.Offline,
  PLAYERS_COUNT: 4,
  PLAYER: {
    gloryCount: 0,
    [AreaType.Attack]: [],
    [AreaType.Preparation]: [],
    [AreaType.Rest]: [],
    [AreaType.Stock]: [],
    movesCount: 0,
  },
  START_CUBE_LIMIT: 2,
  FUTURE_CUBE_LIMIT: 3,
  CARDS_TYPES_COUNT: 7,
  MAX_HIRE_WARRIOR_COUNT: 5,
  MIN_START_ENERGY: 2,
  MAX_START_ENERGY: 6,
  HIRE_LIMIT: 1,
};

export const AREA_ICON_TYPE = {
  LBV: "Left Bottom Vertical",
  LBH: "Left Bottom Horizontal",
  RT: "Right Top",
};

/** Информация об svg иконках, находящихся в углах игровыыых областей */
export const AREA_ICON = {
  [AreaType.Rest]: {
    [AREA_ICON_TYPE.LBV]: {
      PATH: "M59.1787 79.0862H1.40088L1.40088 2.10352L6.95016 10.2321L6.95016 59.96L15.7637 72.392H51.018L59.1787 79.0862Z",
      HEIGHT: 80,
      WIDTH: 61,
    },
    [AREA_ICON_TYPE.LBH]: {
      PATH: "M12.9081 0.534499L2.40088 7.08621L10.8067 7.08621L10.8067 12L47.2318 12L47.2318 7.08621L84.3574 7.08622L77.3526 2.99139L36.0241 2.99139L36.0241 7.08621L21.3139 7.08621L21.3139 0.534499L12.9081 0.534499Z",
      HEIGHT: 8,
      WIDTH: 87,
    },
    [AREA_ICON_TYPE.RT]: {
      PATH: "M2.16071 0.638437L59.9385 0.638443L59.9385 77.6211L54.3892 69.4925L54.3892 19.7646L45.5756 7.33259L10.3214 7.33258L2.16071 0.638437Z",
      HEIGHT: 80,
      WIDTH: 61,
    },
  },
  [AreaType.Preparation]: {
    [AREA_ICON_TYPE.LBV]: {
      PATH: "M67.1573 50.8275H0.613284L0.613281 1.12646L7.00452 6.3744L7.00452 38.4795L17.1553 46.5057H57.7585L67.1573 50.8275Z",
      HEIGHT: 53,
      WIDTH: 68,
    },
    [AREA_ICON_TYPE.LBH]: {
      PATH: "M12.7147 0.597712L0.613281 4.82759L10.2944 4.82759L10.2944 8L52.2461 8L52.2461 4.82759L95.0046 4.82759L86.937 2.18392L39.3379 2.18392L39.3379 4.82759L22.3959 4.82759L22.3959 0.597712L12.7147 0.597712Z",
      HEIGHT: 6,
      WIDTH: 96,
    },
    [AREA_ICON_TYPE.RT]: {
      PATH: "M0.233291 1.05771L66.7774 1.05771L66.7773 50.7588L60.3861 45.5108L60.3861 13.4058L50.2353 5.37954L9.63217 5.37954L0.233291 1.05771Z",
      HEIGHT: 52,
      WIDTH: 67,
    },
  },
  [AreaType.Attack]: {
    [AREA_ICON_TYPE.LBV]: {
      PATH: "M66.9537 26.379H0.60889L0.608887 0.988281L6.98099 3.66929L6.98099 20.0708L17.1014 24.1712H57.583L66.9537 26.379Z",
      HEIGHT: 27,
      WIDTH: 67,
    },
    [AREA_ICON_TYPE.LBH]: {
      PATH: "M12.6739 1.2184L0.608643 3.37931L10.2608 3.37931L10.2608 5L52.0869 5L52.0869 3.37931L94.7173 3.37931L86.6739 2.02874L39.2173 2.02874L39.2173 3.37931L22.326 3.37931L22.326 1.2184L12.6739 1.2184Z",
      HEIGHT: 4,
      WIDTH: 95,
    },
    [AREA_ICON_TYPE.RT]: {
      PATH: "M0.436431 0.540382L66.7813 0.540384L66.7812 25.9312L60.4091 23.2501L60.4092 6.84865L50.2888 2.74828L9.80717 2.74828L0.436431 0.540382Z",
      HEIGHT: 28,
      WIDTH: 68,
    },
  },
};

export const AREA_ICON_COLOR = {
  [PlayerType.Red]: "#8E1E2582",
  [PlayerType.Blue]: "#1E8E8E80",
  [PlayerType.Yellow]: `#F4DEDE47`,
  [PlayerType.Green]: "#008C0680",
};

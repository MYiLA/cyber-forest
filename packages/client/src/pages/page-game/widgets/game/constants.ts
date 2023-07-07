/* eslint-disable no-unused-vars */
/** Тип игрока */
export enum PlayerType {
  /** Красный игрок (первый) */
  Red = 'Red',
  /** Синий игрок (второй) */
  Blue = 'Blue',
  /** Желтый игрок (третий) */
  Yellow = 'Yellow',
  /** Зелёный игрок (четвёртый) */
  Green = 'Green',
}

/** Фазы игры */
export enum PhaseType {
  /** Наполнение инвентаря, выбор воинов из инвентаря */
  Stock = 'Stock',
  /** Наём воинов в киберлесу и призыв воинов из зоны подготовки в зону атаки */
  PreparationAndHiring = 'PreparationAndHiring',
  /** Атака текущего игрока */
  Attack = 'Attack',
  /** Защита при спорной ситуации */
  Defense = 'Defense',
  /** Ожидание только в онлайн-игре */
  Waiting = 'Waiting',
}

/** Цвет игрока */
export const RGB_COLOR = {
  [PlayerType.Red]: '255, 75, 75',
  [PlayerType.Blue]: '124, 240, 240',
  [PlayerType.Yellow]: '251, 229, 33',
  [PlayerType.Green]: '0, 255, 10',
}

/** Тип игровой зоны */
export enum AreaType {
  /** Зона атаки */
  Attack = 'Attack',
  /** Зона подготовки */
  Preparation = 'Preparation',
  /** Зона отдыха */
  Rest = 'Rest',
}

export enum DiceSideType {
  Energy = 'Energy',
  Monster = 'Monster',
  Symbol = 'Symbol',
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
}

export const DICE_SIZE = 60
export const DICE_INDENT = 6

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
}

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
}

/** Типы кубиков */
export enum DiceType {
  /** Волк */
  Wolf = 'Wolf',
  /** Кот */
  Cat = 'Cat',
  /** Лиса */
  Fox = 'Fox',
  /** Змея */
  Snake = 'Snake',
  /** Медведь */
  Bear = 'Bear',
  /** Сова */
  Owl = 'Owl',
  /** Утка */
  Duck = 'Duck',
  /** Заяц */
  Hare = 'Hare',
  /** Жаба */
  Toad = 'Toad',
}

/** Тип игры */
export enum GameType {
  /** Оффлайн */
  Offline = 'Offline',
  /** Онлайн */
  Online = 'Online',
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
    movesCount: 0,
  },
  START_CUBE_LIMIT: 2,
  FUTURE_CUBE_LIMIT: 3,
  CARDS_TYPES_COUNT: 7,
}

import { Player } from "@/pages/page-game/type";

import { Emoji, EmojiPack } from "./constants";

/** Типы кубиков */
export enum DiceType {
  /** Волк */
  Wolf = "Wolf",
  /** Кот */
  Cat = "Cat",
  /** Лиса */
  Fox = "Fox",
  /** Змея */
  Snake = "Snake",
  /** Медведь */
  Bear = "Bear",
  /** Сова */
  Owl = "Owl",
  /** Утка */
  Duck = "Duck",
  /** Заяц */
  Hare = "Hare",
  /** Жаба */
  Toad = "Toad",
}

/** Сторона энергии */
export type DiceSideEnergy = {
  /** Цвет фона */
  color: string;
  /** Цвет текста */
  textColor: string;
  /** Количество энергии */
  energyCount: number;
};

/** Сторона воина */
export type DiceSideWarrior = {
  /** Изображение воина */
  image: string;
  /** Значение атаки */
  attack: number;
  /** Значение защиты */
  defense: number;
  /** Уровень */
  level: number;
  /** Символ способности */
  abilitySymbol?: string;
};

/** Сторона особого символа */
export type DiceSideSymbol = {
  /** Цвет фона */
  color: string;
  /** Цвет текста */
  textColor: string;
  /** Особый символ способности */
  specialAbilitySymbol: string;
};

/** Доступ для найма воинов */
export type AccessHireWarrior = {
  /** Тип воинов. Генерируется при запуске игры */
  type: DiceType;
  /** Количество воинов, доступных для найма. Меняется в процессе игры */
  count: number;
};

/** Эмоция */
export type EmojiType = {
  emoji: Emoji,
  pack?: EmojiPack,
}

/** Сообщение внутри хроники событий */
export type ChronicleMessagePayload = {
  message: string;
  player?: Player;
};

/** Сообщение внутри хроники событий */
export type ChronicleMessage = {
  id: string;
  message: string;
  player?: Player;
};

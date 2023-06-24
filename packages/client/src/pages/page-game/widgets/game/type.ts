import { Player } from '../../type'
import { PlayerType } from './constants'

/** Сторона энергии */
export type DiceSideEnergy = {
  /** Цвет фона */
  color: string
  /** Цвет текста */
  textColor: string
  /** Количество энергии */
  energyCount: number
}

/** Сторона воина */
export type DiceSideWarrior = {
  /** Изображение воина */
  image: string
  /** Значение атаки */
  attack: number
  /** Значение защиты */
  defense: number
  /** Уровень */
  level: number
  /** Символ способности */
  abilitySymbol?: string
}

/** Сторона особого символа */
export type DiceSideSymbol = {
  /** Цвет фона */
  color: string
  /** Цвет текста */
  textColor: string
  /** Особый символ способности */
  specialAbilitySymbol: string
}

export type DiceSide = DiceSideEnergy | DiceSideWarrior | DiceSideSymbol

/** Состояние игры */
export type GameState = {
  /** Состояние красного игрока. Он всегда должен быть */
  [PlayerType.Red]: Player
  /** Состояние синего игрока. Он всегда должен быть */
  [PlayerType.Blue]: Player
  /** Состояние зелёного игрока */
  [PlayerType.Green]?: Player
  /** Состояние жёлтого игрока */
  [PlayerType.Yellow]?: Player
}

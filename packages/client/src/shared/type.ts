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

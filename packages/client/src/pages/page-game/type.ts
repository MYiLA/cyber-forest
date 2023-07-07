import { DiceSide } from './widgets/game/type'
import { PlayerType, DiceType, AreaType } from './widgets/game/constants'

/** Способности */
export type Ability = {
  /** Описание способности */
  desc: string
  /** Символ способности */
  abilitySymbol?: string
}

/** Кубик */
export type Dice = {
  /** Id кубика */
  id: string
  /** Тип кубика */
  type: DiceType
  /** Стороны кубика */
  sides: [DiceSide, DiceSide, DiceSide, DiceSide, DiceSide, DiceSide]
  /** Способности */
  abilities: Ability[]
  /** Стоимость */
  cost: number
  /** Слава */
  glory: number
  /** Действующая сторона */
  activeSide: DiceSide | null
  /** Основное изображение */
  img: string
  /** Цвет подложки основного изображения */
  bgImg: string
  /** Имя воина */
  title: string
}

/** Игрок */
export type Player = {
  /** Айди юзера, если есть аккаунт */
  id?: string
  /** Тип игрока */
  type: PlayerType
  /** Количество славы */
  gloryCount: number
  /** Инвентарь */
  stock: Dice[]
  /** Зона атаки */
  [AreaType.Attack]: Dice[]
  /** Зона подготовки */
  [AreaType.Preparation]: Dice[]
  /** Зона отдыха */
  [AreaType.Rest]: Dice[]
  /** Порядковый номер текущего хода. Так же это общее количество сделанных ходов за всю игру этим игроком*/
  movesCount: number
  /** */
  isActive: boolean
}

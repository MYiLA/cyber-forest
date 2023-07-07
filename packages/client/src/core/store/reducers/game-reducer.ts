import { getAccessHireWarriors } from '@shared/utils/get-access-hire-warriors'
import {
  DEFAULT_SETTING,
  PhaseType,
  PlayerType,
} from '@pages/page-game/widgets/game/constants'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AccessHireWarrior } from '@shared/type'
import { getRandomIntegerInRange } from '@shared/utils/get-random-integer-in-range'

const initialState: {
  /** Тип игрока, который сейчас ходит */
  currentPlayerType: PlayerType
  /** Энергия игрока, который сейчас ходит */
  currentPlayerEnergy: number
  /** Текущая фаза игры */
  currentPhase: PhaseType
  /** Список типов воинов, доступных для найма */
  accessHireWarriors: AccessHireWarrior[]
} = {
  currentPlayerType: PlayerType.Red,
  currentPlayerEnergy: 0,
  currentPhase: PhaseType.Waiting,
  accessHireWarriors: [],
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    /** Подготовка данных к началу игры */
    gameStart: () => {
      return {
        ...initialState,
        accessHireWarriors: getAccessHireWarriors(),
      }
    },

    /** Передать другому игроку текущий ход */
    setCurrentPlayerType: (state, action: PayloadAction<PlayerType>) => {
      return {
        ...state,
        currentPlayerType: action.payload,
      }
    },

    /** Перейти на другую фазу игры */
    setCurrentPhase: (state, action: PayloadAction<PhaseType>) => {
      return {
        ...state,
        currentPhase: action.payload,
      }
    },

    /** Сгенерировать энергию игроку в начале хода*/
    createCurrentPlayerEnergy: state => {
      return {
        ...state,
        currentPlayerEnergy: getRandomIntegerInRange(
          DEFAULT_SETTING.MIN_START_ENERGY,
          DEFAULT_SETTING.MAX_START_ENERGY
        ),
      }
    },

    /** Увеличить энергию текущего игрока */
    increaseCurrentPlayerEnergy: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        currentPlayerEnergy: state.currentPlayerEnergy + action.payload,
      }
    },

    /** Уменьшить энергию текущего игрока */
    decreaseCurrentPlayerEnergy: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        currentPlayerEnergy: state.currentPlayerEnergy - action.payload,
      }
    },

    /** Увеличить счётчик найма воина в киберлесе */
    increaseAccessHireWarriors: (
      state,
      action: PayloadAction<AccessHireWarrior>
    ) => {
      const { count, type } = action.payload
      return {
        ...state,
        accessHireWarriors: state.accessHireWarriors.map(item =>
          item.type === type
            ? {
                type: item.type,
                count: item.count + count,
              }
            : item
        ),
      }
    },

    /** Уменьшить счётчик найма воина в киберлесе */
    decreaseAccessHireWarriors: (
      state,
      action: PayloadAction<AccessHireWarrior>
    ) => {
      const { count, type } = action.payload
      return {
        ...state,
        accessHireWarriors: state.accessHireWarriors.map(item =>
          item.type === type
            ? {
                type: item.type,
                count: item.count - count,
              }
            : item
        ),
      }
    },

    /** Сбросить все счётчики найма воинов в киберлесе */
    resetAllAccessHireWarriors: state => {
      return {
        ...state,
        accessHireWarriors: state.accessHireWarriors.map(item => ({
          type: item.type,
          count: DEFAULT_SETTING.MAX_HIRE_WARRIOR_COUNT,
        })),
      }
    },
  },
})

export default gameSlice.reducer

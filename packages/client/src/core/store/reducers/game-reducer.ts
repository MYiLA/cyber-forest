import { v4 as uuid4 } from "uuid";
import { getAccessHireWarriors } from "@shared/utils/get-access-hire-warriors";
import {
  ChronicleMessage,
  AccessHireWarrior,
  ChronicleMessagePayload,
} from "@shared/type";
import {
  DEFAULT_SETTING,
  GameType,
  PhaseType,
  PlayerType,
} from "@pages/page-game/widgets/game/constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  /** Тип игры. По-умолчанию оффлайн */
  gameType: GameType;
  /** Тип игрока, который сейчас ходит */
  currentPlayerType: PlayerType;
  /** Энергия игрока, который сейчас ходит */
  currentPlayerEnergy: number;
  /** Текущая фаза игры */
  currentPhase: PhaseType;
  /** Список типов воинов, доступных для найма */
  accessHireWarriors: AccessHireWarrior[];
  /** Максимальная слава для завершения игры */
  maxGlory: number;
  /** Загрузка данных для игры */
  loading: boolean;
  /** Список сообщений в хронике */
  chronicleMessages: ChronicleMessage[];
} = {
  currentPlayerType: PlayerType.Red,
  currentPlayerEnergy: 0,
  currentPhase: PhaseType.Waiting,
  accessHireWarriors: [],
  maxGlory: 25,
  loading: false,
  gameType: GameType.Offline,
  chronicleMessages: [],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    /** Подготовка данных к началу игры */
    gameStart: () => ({
      ...initialState,
      accessHireWarriors: getAccessHireWarriors(),
      loading: true,
    }),

    /** Передать другому игроку текущий ход */
    setCurrentPlayerType: (state, action: PayloadAction<PlayerType>) => ({
      ...state,
      currentPlayerType: action.payload,
    }),

    /** Перейти на другую фазу игры */
    setCurrentPhase: (state, action: PayloadAction<PhaseType>) => ({
      ...state,
      currentPhase: action.payload,
      loading: false,
    }),

    /** Установить кастомное число очков славы для победы (оффлайн опция) */
    setMaxGlory: (state, action: PayloadAction<number>) => ({
      ...state,
      maxGlory: action.payload,
      loading: true,
    }),

    /** Сгенерировать энергию игроку в начале хода */
    createCurrentPlayerEnergy: (state, action: PayloadAction<number>) => ({
      ...state,
      currentPlayerEnergy: action.payload,
    }),

    /** Увеличить энергию текущего игрока */
    increaseCurrentPlayerEnergy: (state, action: PayloadAction<number>) => ({
      ...state,
      currentPlayerEnergy: state.currentPlayerEnergy + action.payload,
    }),

    /** Уменьшить энергию текущего игрока */
    decreaseCurrentPlayerEnergy: (state, action: PayloadAction<number>) => ({
      ...state,
      currentPlayerEnergy: state.currentPlayerEnergy - action.payload,
    }),

    /** Увеличить счётчик найма воина в киберлесе */
    increaseAccessHireWarriors: (
      state,
      action: PayloadAction<AccessHireWarrior>
    ) => {
      const { count, type } = action.payload;
      return {
        ...state,
        accessHireWarriors: state.accessHireWarriors.map((item) =>
          item.type === type
            ? {
                type: item.type,
                count: item.count + count,
              }
            : item
        ),
      };
    },

    /** Уменьшить счётчик найма воина в киберлесе */
    decreaseAccessHireWarriors: (
      state,
      action: PayloadAction<AccessHireWarrior>
    ) => {
      const { count, type } = action.payload;
      return {
        ...state,
        accessHireWarriors: state.accessHireWarriors.map((item) =>
          item.type === type
            ? {
                type: item.type,
                count: item.count - count,
              }
            : item
        ),
      };
    },

    /** Сбросить все счётчики найма воинов в киберлесе */
    resetAllAccessHireWarriors: (state) => ({
      ...state,
      accessHireWarriors: state.accessHireWarriors.map((item) => ({
        type: item.type,
        count: DEFAULT_SETTING.MAX_HIRE_WARRIOR_COUNT,
      })),
    }),

    /** Очистить хронику */
    resetChronicle: (state) => ({
      ...state,
      chronicleMessages: [],
    }),

    /** Добавить сообщение в хронику */
    addMessageInChronicle: (
      state,
      action: PayloadAction<ChronicleMessagePayload>
    ) => ({
      ...state,
      chronicleMessages: [
        ...state.chronicleMessages,
        { ...action.payload, id: uuid4() },
      ],
    }),
  },
});

export default gameSlice.reducer;

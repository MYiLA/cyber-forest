import { getInitialGameState } from '@shared/utils/get-initial-game-state'
import { PlayerType } from '@pages/page-game/widgets/game/constants'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GameState } from '@pages/page-game/widgets/game/type'
import { IncreaseGloryPayload, DicesInAreaPayload, PayloadStart } from './type'

const initialState: GameState = {
  [PlayerType.Red]: null,
  [PlayerType.Blue]: null,
}

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    /** Начало игры. Создание игроков и зон */
    gameStart: (state, action: PayloadAction<PayloadStart>) => {
      const initialGameState = getInitialGameState({
        playersCount: action.payload.playersCount,
        users: action.payload.users,
      })
      return {
        ...initialGameState,
      }
    },

    /** Удаление кубиков из зоны игрока */
    deleteDicesInArea: (
      state,
      action: PayloadAction<DicesInAreaPayload>
    ): void => {
      const { areaType, dices, playerType } = action.payload
      const player = state?.[playerType]
      if (!player) return

      const prevDices = player[areaType]
      const newDices = prevDices.filter(
        dice => !dices.some(item => item.id === dice.id)
      )
      player[areaType] = newDices
    },

    /** Добавление кубиков в зону игрока */
    addDicesInArea: (state, action: PayloadAction<DicesInAreaPayload>) => {
      const { areaType, dices, playerType } = action.payload
      const player = state?.[playerType]
      if (!player) return

      const prevDices = player[areaType]
      dices.forEach(dice => prevDices.push(dice))
    },

    /** Добавление славы игроку */
    increaseGlory: (state, action: PayloadAction<IncreaseGloryPayload>) => {
      const { gloryCount, playerType } = action.payload
      const player = state?.[playerType]
      if (!player) return

      player.gloryCount += gloryCount
    },

    /** Сброс славы игрока */
    resetGlory: (state, action: PayloadAction<PlayerType>) => {
      const playerType = action.payload
      const player = state?.[playerType]
      if (!player) return

      player.gloryCount = 0
    },

    /** Увеличение счётчика хода игрока */
    increaseMovesCount: (state, action: PayloadAction<PlayerType>) => {
      const playerType = action.payload
      const player = state?.[playerType]
      if (!player) return

      const prevMovesCount = player.movesCount ?? 0
      player.movesCount = prevMovesCount + 1
    },

    /** Сброс счётчика хода игрока */
    resetMovesCount: (state, action: PayloadAction<PlayerType>) => {
      const playerType = action.payload
      const player = state?.[playerType]
      if (!player) return

      player.movesCount = 0
    },
  },
})

export default playersSlice.reducer

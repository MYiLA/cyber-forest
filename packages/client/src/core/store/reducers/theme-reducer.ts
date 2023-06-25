import { createSlice } from '@reduxjs/toolkit'
import { Theme } from '@config/constants'

type ThemeState = {
  themeName: Theme
}

const initialState = {
  themeName: Theme.Purple,
} as ThemeState

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: state => {
      return {
        ...state,
        themeName: state.themeName === Theme.Purple ? Theme.Neon : Theme.Purple,
      }
    },
  },
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer

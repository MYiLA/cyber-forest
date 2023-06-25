import { createSlice } from '@reduxjs/toolkit'
import { THEME } from '@config/constants'

const initialState = {
  themeName: THEME.PURPUR,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: state => {
      return {
        ...state,
        themeName: state.themeName === THEME.PURPUR ? THEME.NEON : THEME.PURPUR,
      }
    },
  },
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer

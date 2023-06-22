import { createSlice } from '@reduxjs/toolkit'
import { THEME } from '../../config/constants'

const initialState = {
  themeName: THEME.NEON,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: state => {
      return {
        ...state,
        themeName: state.themeName === THEME.MURMUR ? THEME.NEON : THEME.MURMUR,
      }
    },
  },
  // eslint-disable-next-line
  extraReducers: builder => {},
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer

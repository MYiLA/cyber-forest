import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
  // eslint-disable-next-line
  extraReducers: builder => {},
})

// eslint-disable-next-line
export const {} = gameSlice.actions
export default gameSlice.reducer

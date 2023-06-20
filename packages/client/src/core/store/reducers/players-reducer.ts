import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {},
  // eslint-disable-next-line
  extraReducers: builder => {},
})

// eslint-disable-next-line
export const {} = playersSlice.actions
export default playersSlice.reducer

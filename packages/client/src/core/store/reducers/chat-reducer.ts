// Chat reducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  // eslint-disable-next-line
  extraReducers: builder => {},
})

// eslint-disable-next-line
export const {} = chatSlice.actions
export default chatSlice.reducer

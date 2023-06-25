// Forum reducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {},
  // eslint-disable-next-line
  extraReducers: builder => {},
})

// eslint-disable-next-line
export const {} = forumSlice.actions
export default forumSlice.reducer

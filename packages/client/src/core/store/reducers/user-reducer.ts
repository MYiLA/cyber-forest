import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  authorized: true,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  // eslint-disable-next-line
  extraReducers: builder => {},
})

// eslint-disable-next-line
export const {} = userSlice.actions
export default userSlice.reducer

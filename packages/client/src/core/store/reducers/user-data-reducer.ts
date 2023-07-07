import { createAsyncThunk } from '@reduxjs/toolkit'
import { UserRegister } from '@config/user-types'
import ApiAuth from '@api/auth-api'
import UserApi from '@api/user-api'

export const userChangeData = createAsyncThunk(
  'user/profile',
  (data: UserRegister) => {
    return UserApi.userChangeData(data).then(() => ApiAuth.userGetInfo())
  }
)

export const userChangeAvatar = createAsyncThunk(
  'user/profile/avatar',
  (data: { avatar: object }) => {
    return UserApi.userChangeAvatar(data).then(() => ApiAuth.userGetInfo())
  }
)

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ApiAuth from '@api/auth-api'
import { fakeUser, User, UserLogin, UserRegister } from '@config/user-types'
import UserApi from '@api/user-api'

export const userLogin = createAsyncThunk('user/login', (data: UserLogin) => {
  return ApiAuth.userLogin(data).then(() => ApiAuth.userGetInfo())
})

export const userLogout = createAsyncThunk('user/logout', () => {
  return ApiAuth.userLogout()
})

export const userRegister = createAsyncThunk(
  'user/register',
  (data: UserRegister) => {
    return ApiAuth.userRegister(data).then(() => ApiAuth.userGetInfo())
  }
)

export const userGetInfo = createAsyncThunk('user/info', () => {
  return ApiAuth.userGetInfo()
})

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

const initialState: {
  authorized: boolean | null
  loading: boolean
  error: string | null
  authChecked: boolean
  user: User | null
} = {
  authorized: false,
  loading: false,
  error: null,
  authChecked: false,
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    ssrPrepare: () => {
      return {
        ...initialState,
        authorized: true,
        authChecked: true,
        user: fakeUser,
      }
    },
    resetError: state => {
      return { ...state, error: null }
    },
  },
  extraReducers: builder => {
    builder
      /** Профиль пользователя */
      // Здесь надо получить данные функции userChangeData и поменять стэйт (по образцу как сделано ниже)
      // после этого, данные пользователя обновятся во всех компонентах где используются

      /** Аватар пользователя */
      // Здесь надо получить данные функции userChangeAvatar и поменять стэйт (по образцу как сделано ниже)
      // после этого, данные пользователя обновятся во всех компонентах где используются

      /** Логин пользователя */
      .addCase(userLogin.pending, state => {
        return { ...state, loading: true }
      })
      .addCase(userLogin.rejected, (state, action) => {
        return { ...state, error: action.error.message as string }
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        return {
          ...initialState,
          user: action.payload.data,
          authorized: true,
          authChecked: true,
        }
      })

      /** Выход пользователя */
      .addCase(userLogout.pending, () => {
        return { ...initialState, loading: true }
      })
      .addCase(userLogout.rejected, (state, action) => {
        return { ...initialState, error: action.error.message as string }
      })
      .addCase(userLogout.fulfilled, () => {
        return { ...initialState }
      })

      /** Информация о пользователя */
      .addCase(userGetInfo.pending, state => {
        return { ...state, loading: true }
      })
      .addCase(userGetInfo.rejected, () => {
        return {
          ...initialState,
          authChecked: true,
        }
      })
      .addCase(userGetInfo.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          authorized: true,
          error: null,
          user: action.payload.data,
          authChecked: true,
        }
      })

      /** Регистрация пользователя */
      .addCase(userRegister.pending, state => {
        return { ...state, loading: true }
      })
      .addCase(userRegister.rejected, (state, action) => {
        return { ...initialState, error: action.error.message as string }
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        return {
          ...state,
          user: action.payload.data,
          loading: false,
          authChecked: true,
          authorized: true,
        }
      })
  },
})

export const { resetError, ssrPrepare } = userSlice.actions
export default userSlice.reducer

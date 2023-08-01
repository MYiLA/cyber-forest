import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiAuth from "@api/auth-api";
import {
  User,
  UserLogin,
  UserPassword,
  UserRegister,
} from "@config/user-types";
import UserApi from "@api/user-api";

export const userLogin = createAsyncThunk("user/login", (data: UserLogin) =>
  ApiAuth.userLogin(data).then(() => ApiAuth.userGetInfo())
);

export const userOauthLogin = createAsyncThunk("user/oauth", (code: number) =>
  ApiAuth.userOauthLogin(code).then(() => ApiAuth.userGetInfo())
);

export const userLogout = createAsyncThunk("user/logout", () =>
  ApiAuth.userLogout()
);

export const userRegister = createAsyncThunk(
  "user/register",
  (data: UserRegister) =>
    ApiAuth.userRegister(data).then(() => ApiAuth.userGetInfo())
);

export const userGetInfo = createAsyncThunk(
  "user/info",
  (cookies: Record<string, string> | null = null) =>
    ApiAuth.userGetInfo(cookies)
);

export const userChangeData = createAsyncThunk(
  "user/profile",
  (data: UserRegister) =>
    UserApi.userChangeData(data).then(() => ApiAuth.userGetInfo())
);

export const userChangeAvatar = createAsyncThunk(
  "user/profile/avatar",
  (data: { avatar: object }) =>
    UserApi.userChangeAvatar(data).then(() => ApiAuth.userGetInfo())
);

export const userChangePassword = createAsyncThunk(
  "user/password",
  (data: UserPassword) =>
    UserApi.userChangePassword(data).then(() => ApiAuth.userGetInfo())
);

const initialState: {
  authorized: boolean | null;
  loading: boolean;
  error: string | null;
  authChecked: boolean;
  user: User | null;
} = {
  authorized: false,
  loading: false,
  error: null,
  authChecked: false,
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetError: (state) => ({ ...state, error: null }),
  },
  extraReducers: (builder) => {
    builder
      /** Профиль пользователя */
      .addCase(userChangeData.pending, (state) => ({ ...state, loading: true }))
      .addCase(userChangeData.fulfilled, (state, action) => ({
        ...initialState,
        user: action.payload.data,
        authorized: true,
        authChecked: true,
      }))
      .addCase(userChangeAvatar.rejected, (state, action) => ({
        ...state,
        error: action.error.message as string,
      }))

      /** Аватар пользователя */
      .addCase(userChangeAvatar.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(userChangeAvatar.fulfilled, (state, action) => ({
        ...initialState,
        user: action.payload.data,
        authorized: true,
        authChecked: true,
      }))
      .addCase(userChangeData.rejected, (state, action) => ({
        ...state,
        error: action.error.message as string,
      }))
      /** Смена пароля */

      .addCase(userChangePassword.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(userChangePassword.rejected, (state, action) => ({
        ...state,
        error: action.error.message as string,
      }))

      /** Логин пользователя */
      .addCase(userLogin.pending, (state) => ({ ...state, loading: true }))
      .addCase(userLogin.rejected, (state, action) => ({
        ...state,
        error: action.error.message as string,
      }))
      .addCase(userLogin.fulfilled, (state, action) => {
        if (typeof localStorage !== "undefined") {
          localStorage.setItem("userData", JSON.stringify(action.payload.data));
        }
        return {
          ...initialState,
          user: action.payload.data,
          authorized: true,
          authChecked: true,
        };
      })

      /** Oauth авторизация */
      .addCase(userOauthLogin.pending, (state) => ({ ...state, loading: true }))
      .addCase(userOauthLogin.rejected, (state, action) => ({
        ...state,
        error: action.error.message as string,
      }))
      .addCase(userOauthLogin.fulfilled, (state, action) => {
        if (typeof localStorage !== "undefined") {
          localStorage.setItem("userData", JSON.stringify(action.payload.data));
        }
        return {
          ...initialState,
          user: action.payload.data,
          authorized: true,
          authChecked: true,
        };
      })

      /** Выход пользователя */
      .addCase(userLogout.pending, (state) => {
        console.log("logout pending");
        return { ...state, loading: true };
      })
      .addCase(userLogout.rejected, (state) => {
        console.log("logout reject");
        return {
          ...state,
          loading: false,
        };
      })
      .addCase(userLogout.fulfilled, () => {
        console.log("logout filled");
        localStorage.removeItem("userData");
        return { ...initialState, authChecked: true };
      })

      /** Информация о пользователя */
      .addCase(userGetInfo.pending, (state) => ({ ...state, loading: true }))
      .addCase(userGetInfo.rejected, () => ({
        ...initialState,
        authChecked: true,
      }))
      .addCase(userGetInfo.fulfilled, (state, action) => {
        console.log(action, "get info");
        if (typeof localStorage !== "undefined") {
          localStorage.setItem("userData", JSON.stringify(action.payload.data));
        }
        return {
          ...state,
          loading: false,
          authorized: true,
          error: null,
          user: action.payload.data,
          authChecked: true,
        };
      })

      /** Регистрация пользователя */
      .addCase(userRegister.pending, (state) => ({ ...state, loading: true }))
      .addCase(userRegister.rejected, (state, action) => ({
        ...initialState,
        error: action.error.message as string,
      }))
      .addCase(userRegister.fulfilled, (state, action) => {
        localStorage.setItem("userData", JSON.stringify(action.payload.data));
        return {
          ...state,
          user: action.payload.data,
          loading: false,
          authChecked: true,
          authorized: true,
        };
      });
  },
});

export const { resetError } = userSlice.actions;
export default userSlice.reducer;

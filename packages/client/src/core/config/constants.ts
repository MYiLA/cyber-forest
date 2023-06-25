export const PATH = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/registration',
  FORGOT_PASS: '/forgot-password',
  RESET_PASS: '/reset-password',
  LOBBY: '/lobby',
  TABLE: '/lobby/table',
  USER: '/user-data',
  HELP: '/lobby/help',
  ERROR: '/error',
  ABOUT: '/about',
}

export enum Theme {
  Neon = 'neon',
  Purple = 'purple',
}

export const API_URL = 'https://ya-praktikum.tech/api/v2'

export const API_AUTH = {
  USER_LOGIN: '/auth/signin',
  USER_REGISTER: '/auth/signup',
  USER_LOGOUT: '/auth/logout',
  USER_INFO: '/auth/user',
}

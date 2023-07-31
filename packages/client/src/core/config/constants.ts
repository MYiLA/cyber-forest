export const PATH = {
  HOME: "/",
  LOGIN: "/login",
  OAUTH_LOGIN: "/login/:code",
  REGISTER: "/registration",
  FORGOT_PASS: "/forgot-password",
  RESET_PASS: "/reset-password",
  LOBBY: "/lobby",
  TOPIC: "/lobby/topic/*",
  USER: "/user-data",
  HELP: "/lobby/help",
  ERROR: "/error",
  ERROR500: "/error/500",
  ABOUT: "/about",
  GAME: "/game",
  LEADER_BOARD: "/leader-board",
};

export enum Theme {
  Neon = "neon",
  Purple = "purple",
}

// export const API_URL = 'https://ya-praktikum.tech/api/v2'
// export const API_URL = 'http://localhost:3001/api'
export const API_URL = "https://cyberforest.ru/api";

export const API_AUTH = {
  USER_LOGIN: "/auth/signin",
  USER_REGISTER: "/auth/signup",
  USER_LOGOUT: "/auth/logout",
  USER_INFO: "/auth/user",
  USER_OAUTH_LOGIN: "/#/OAuth/Yandex",
};

export const API_USER = {
  USER_AVATAR: "user/profile/avatar",
  USER_PASSWORD: "user/password",
  USER_DATA: "user/profile",
};

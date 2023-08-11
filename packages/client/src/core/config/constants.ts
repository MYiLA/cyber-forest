/** временное решение во избежание ошибки c process.env */
// eslint-disable-next-line
import express from "express";

export const PATH = {
  HOME: "/",
  LOGIN: "/login",
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
// export const API_URL = "http://localhost:3001/api";
export const API_URL = "https://cyberforest.ru/api";

export const API_RESOURCES = "/resources";

export const API_AUTH = {
  USER_LOGIN: "/auth/signin",
  USER_REGISTER: "/auth/signup",
  USER_LOGOUT: "/auth/logout",
  USER_INFO: "/auth/user",
  USER_OAUTH_LOGIN: "/oauth/yandex",
};

export const API_USER = {
  USER_AVATAR: "user/profile/avatar",
  USER_PASSWORD: "user/password",
  USER_DATA: "user/profile",
};

export const OAUTH_URL = `https://oauth.yandex.ru/authorize?response_type=code&client_id=b78539a1fbf841339d5d675c7f64f954${
  process.env.NODE_ENV === "development"
    ? "&redirect_uri=http://localhost:3000/login"
    : ""
}`;

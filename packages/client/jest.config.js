import dotenv from "dotenv";
dotenv.config();

export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/src/__tests__/*.test.{ts,tsx}"],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  moduleNameMapper: {
    "^.+\\.svg$": "<rootDir>/src/__tests__/fileMock.ts",
    "^.+\\.png$": "<rootDir>/src/__tests__/fileMock.ts",
    "\\.(css|less|scss|sass|scss\\?inline)$": "identity-obj-proxy",
    "^@api/(.*)$": "<rootDir>/src/core/api/$1",
    "^@config/(.*)$": "<rootDir>/src/core/config/$1",
    "^@core/(.*)$": "<rootDir>/src/core/$1",
    "^@router/(.*)$": "<rootDir>/src/core/router/$1",
    "^@store/(.*)$": "<rootDir>/src/core/store/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@shared/(.*)$": "<rootDir>/src/shared/$1",
    "^@hooks/(.*)$": "<rootDir>/src/shared/hooks/$1",
    "^@layouts/(.*)$": "<rootDir>/src/shared/layouts/$1",
    "^@ui/(.*)$": "<rootDir>/src/shared/ui/$1",
    "^@utils/(.*)$": "<rootDir>/src/shared/utils/$1",
    "^@scss/(.*)\\?inline$": "<rootDir>/src/core/scss/$1",
    "^@scss/(.*)$": "<rootDir>/src/core/scss/$1",
    "^@images/(.*)$": "<rootDir>/src/assets/images/$1",
    "^@fonts/(.*)$": "<rootDir>/src/assets/fonts/$1",
  },
};

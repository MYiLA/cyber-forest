import { createSlice } from "@reduxjs/toolkit";
import { Theme } from "@config/constants";

type ThemeState = {
  themeName: Theme;
};

const initialState = {
  themeName: Theme.Purple,
} as ThemeState;

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => ({
      ...state,
      themeName: state.themeName === Theme.Purple ? Theme.Neon : Theme.Purple,
    }),
    setTheme: (state, action) => ({
      ...state,
      themeName: action.payload,
    }),
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;

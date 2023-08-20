import { useSelector } from "react-redux";
import scrollbarNeon from "@scss/_scrollbar-neon.scss?inline";
import scrollbarPurple from "@scss/_scrollbar-purple.scss?inline";
import { Theme } from "@config/constants";

const getTheme = (store: RootState) =>
  (store.user.user?.settings?.theme as Theme) ?? Theme.Purple;

const themeIsEqual = (
  prevState: string | undefined,
  nextState: string | undefined
) => prevState === nextState;

const scrollbars = {
  [Theme.Neon]: scrollbarNeon,
  [Theme.Purple]: scrollbarPurple,
};

export const useTheme = () => {
  const themeSelector = useSelector(getTheme, themeIsEqual);

  if (typeof document !== "undefined" && themeSelector) {
    const style =
      document.getElementById("main-scrollbar") ||
      document.createElement("style");
    if (!style.id) {
      style.id = "main-scrollbar";
      document.head.appendChild(style);
    }
    style.textContent = scrollbars[themeSelector as Theme];
  }
  return themeSelector;
};

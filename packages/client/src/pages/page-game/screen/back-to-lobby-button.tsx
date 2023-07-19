import cn from "classnames";
import { PATH, Theme } from "@config/constants";
import { MainButton } from "@ui/main-button/main-button";
import { useTheme } from "@hooks/use-theme";
import { useNavigate } from "react-router-dom";
import styles from "./screen.module.scss";

type Props = {
  className?: string;
};
export const BackToLobbyButton = (props: Props) => {
  const { themeName } = useTheme();
  const { className } = props;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(PATH.LOBBY);
  };
  return (
    <MainButton
      onClick={handleClick}
      className={cn(styles.lobby_button, className, {
        [styles.neon]: themeName === Theme.Neon,
        [styles.purple]: themeName === Theme.Purple,
      })}
    >
      Вернуться в лобби
    </MainButton>
  );
};

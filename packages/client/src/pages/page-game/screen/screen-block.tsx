import { ReactNode } from "react";
import cn from "classnames";
import { Theme } from "@config/constants";
import { useTheme } from "@hooks/use-theme";
import winCornerLtImg from "@images/win-corner-lt.svg";
import winCornerLbImg from "@images/win-corner-lb.svg";
import winCornerRtImg from "@images/win-corner-rt.svg";
import styles from "./screen.module.scss";

type Props = {
  children: ReactNode;
  className?: string;
};

export function ScreenBlock(props: Props) {
  const { themeName } = useTheme();
  const { children, className } = props;
  return (
    <div
      className={cn(styles.screen_wrapper, className, {
        [styles.purple]: themeName === Theme.Purple,
        [styles.neon]: themeName === Theme.Neon,
      })}
    >
      <img
        src={winCornerLtImg}
        className={cn(styles.border, styles.border_lt)}
        alt="win corner"
      />
      <img
        src={winCornerLbImg}
        className={cn(styles.border, styles.border_lb)}
        alt="win corner"
      />
      <img
        src={winCornerRtImg}
        className={cn(styles.border, styles.border_rt)}
        alt="win corner"
      />
      {children}
    </div>
  );
}

import cornerLt from "@images/win-corner-lt.svg";
import cornerLb from "@images/win-corner-lb.svg";
import cornerRt from "@images/win-corner-rt.svg";
import cornerRb from "@images/win-corner-rb.svg";
import { FC, ReactNode } from "react";
import cn from "classnames";
import { Theme } from "@config/constants";
import { useTheme } from "@hooks/use-theme";
import styles from "./dialog-window.module.scss";

export const DialogWindow: FC<{ children: ReactNode; extraClass?: string }> = ({
  children,
  extraClass,
}) => {
  const themeName = useTheme();
  return (
    <div className={cn(styles.window)}>
      <div
        className={cn(
          styles.inside_one,
          extraClass,
          themeName === Theme.Purple ? styles.purple : styles.neon
        )}
      >
        <img className={styles.lt} src={cornerLt} alt="рамка слева сверху" />
        <img className={styles.lb} src={cornerLb} alt="рамка слева снизу" />
        <img className={styles.rt} src={cornerRt} alt="рамка справа сверху" />
        <img className={styles.rb} src={cornerRb} alt="рамка справа снизу" />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

import { ReactElement, ReactNode, useState } from "react";
import { useTheme } from "@hooks/use-theme";
import { Theme } from "@config/constants";
import cn from "classnames";
import styles from "./tooltip.module.scss";

interface TooltipProps {
  direction: "top" | "left" | "right" | "bottom";
  children: ReactNode;
  text: string;
}

export const Tooltip = ({
  children,
  text,
  direction = "top",
}: TooltipProps): ReactElement => {
  let timeout: NodeJS.Timeout;
  const [active, setActive] = useState(false);

  const themeName = useTheme();

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, 200);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      className={styles.tooltip_wrapper}
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {active && (
        <div
          className={cn(styles.tooltip_tip, {
            [styles.purple]: themeName === Theme.Purple,
            [styles.neon]: themeName === Theme.Neon,
            [styles.top]: direction === "top",
            [styles.bottom]: direction === "bottom",
            [styles.left]: direction === "left",
            [styles.right]: direction === "right",
          })}
        >
          <span>{text}</span>
        </div>
      )}
    </div>
  );
};

import { ReactElement, useEffect, useState } from "react";
import { useTheme } from "@hooks/use-theme";
import { Theme } from "@config/constants";
import styles from "./switcher.module.scss";

type SwitcherType = "default" | "theme-toggle";

interface SwitcherProps {
  labels: string[];
  state: boolean;
  onClick: (value: string) => void;
  type?: SwitcherType;
}

export const Switcher = ({
  labels,
  state,
  onClick,
  type = "default",
}: SwitcherProps): ReactElement => {
  const [active, setActive] = useState(state);
  const [activeLabel, setActiveLabel] = useState(
    active ? labels[0] : labels[1]
  );
  const themeName = useTheme();

  useEffect(() => {
    if (active) {
      setActiveLabel(labels[1]);
    } else {
      setActiveLabel(labels[0]);
    }
  }, [active]);

  function onChange() {
    setActive(!active);
    onClick(activeLabel);
  }

  return (
    <div
      className={
        type === "theme-toggle"
          ? `${styles.wrapper_themetoggle} ${styles.wrapper}`
          : styles.wrapper
      }
    >
      <div className={styles.wrapper_label}>
        <span
          className={
            activeLabel === labels[0]
              ? `${styles.left} ${styles.active} ${
                  themeName === Theme.Purple
                    ? styles.active_purpur
                    : styles.active_neon
                }`
              : `${styles.left} ${styles.unactive} ${
                  themeName === Theme.Purple
                    ? styles.unactive_purpur
                    : styles.unactive_neon
                }`
          }
        >
          {labels[0]}
        </span>
        <span
          className={
            activeLabel === labels[1]
              ? `${styles.right} ${styles.active} ${
                  themeName === Theme.Purple
                    ? styles.active_purpur
                    : styles.active_neon
                }`
              : `${styles.right} ${styles.unactive} ${
                  themeName === Theme.Purple
                    ? styles.unactive_purpur
                    : styles.unactive_neon
                }`
          }
        >
          {labels[1]}
        </span>
      </div>
      <label className={styles.switch}>
        <input type="checkbox" checked={active} onChange={() => onChange()} />
        <div
          className={`${styles.slider} ${
            themeName === Theme.Purple
              ? styles.slider_purpur
              : styles.slider_neon
          }`}
        />
      </label>
    </div>
  );
};

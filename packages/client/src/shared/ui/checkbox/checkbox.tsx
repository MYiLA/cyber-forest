import { ChangeEvent } from "react";
import { useTheme } from "@hooks/use-theme";
import { Theme } from "@config/constants";
import styles from "./checkbox.module.scss";

interface CheckboxProps {
  label: string;
  classname?: string;
  name: string;
  value: boolean;
  onClick: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Checkbox({
  label,
  classname,
  name,
  value,
  onClick,
}: CheckboxProps) {
  const { themeName } = useTheme();

  return (
    <div className={classname}>
      <label
        className={`${styles.label}  ${
          themeName === Theme.Purple ? styles.purpur : styles.neon
        }`}
        htmlFor="checkbox"
      >
        {label}
      </label>
      <input
        type="checkbox"
        name={name}
        className={styles.input}
        defaultChecked={value}
        onChange={onClick}
      />
    </div>
  );
}

import SvgInputUnderlineR from "@images/input-underline-r.svg";
import SvgInputUnderlineL from "@images/input-underline-l.svg";
import { FC, InputHTMLAttributes, useCallback } from "react";
import cn from "classnames";
import { Theme } from "@config/constants";
import { useTheme } from "@hooks/use-theme";
import styles from "./main-input.module.scss";

interface TInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  placeholder?: string;
  type?: string;
  extraClassName?: string;
  error?: string | null;
  className?: string;
  align?: string;
}

const InputUnderlineR = () => <img src={SvgInputUnderlineR} alt="right" />;
const InputUnderlineL = () => <img src={SvgInputUnderlineL} alt="left" />;

export const MainInput: FC<TInputProps> = ({
  extraClassName,
  name,
  placeholder,
  type = "text",
  error = null,
  className,
  align = "left",
  ...rest
}) => {
  const themeName = useTheme();

  const DecorImage = useCallback(
    ({ color }: { color: Theme }) => (
      <>
        {align === "left" && (
          <div
            className={`${styles.bottom_right} ${
              color === Theme.Purple ? styles.purple : styles.neon
            }`}
          >
            <InputUnderlineR />
          </div>
        )}
        {align === "right" && (
          <div
            className={`${styles.bottom_left} ${
              color === Theme.Purple ? styles.purple : styles.neon
            }`}
          >
            <InputUnderlineL />
          </div>
        )}
        {align === "none" && <></>}
      </>
    ),
    [align]
  );

  return (
    <>
      {type === "checkbox" ? (
        <div className={cn(styles.custom_checkbox, className)}>
          <input
            type={type}
            name={name}
            className={extraClassName}
            {...rest}
            id="customCheckbox"
          />
          <label htmlFor="customCheckbox" />
        </div>
      ) : (
        <div
          className={cn(
            styles.container,
            className,
            align === "right" ? styles.right_direction : ""
          )}
        >
          <DecorImage color={themeName} />
          <input
            name={name}
            type={type}
            className={`${extraClassName} ${
              themeName === Theme.Purple ? styles.purple : styles.neon
            }`}
            placeholder=" "
            {...rest}
          />
          <label
            className={`${styles.placeholder} ${
              themeName === Theme.Purple ? styles.purple : styles.neon
            }`}
          >
            {placeholder}
          </label>
          {error && <div className={styles.error}>{error}</div>}
        </div>
      )}
    </>
  );
};

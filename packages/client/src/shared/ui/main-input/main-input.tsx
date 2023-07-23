import inputUnderlineR from "@images/input-underline-r.svg";
import inputUnderlineL from "@images/input-underline-l.svg";
import { FC, Fragment, InputHTMLAttributes, useCallback } from "react";
import cn from "classnames";
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
  const DecorImage = useCallback(
    () => (
      <>
        {align === "left" && (
          <img
            className={styles.bottom_right}
            src={inputUnderlineR}
            alt="стилизация input справа"
          />
        )}
        {align === "right" && (
          <img
            className={styles.bottom_left}
            src={inputUnderlineL}
            alt="стилизация input слева"
          />
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
          <DecorImage />
          <input
            name={name}
            type={type}
            className={extraClassName}
            placeholder=" "
            {...rest}
          />
          <label className={styles.placeholder}>{placeholder}</label>
          {error && <div className={styles.error}>{error}</div>}
        </div>
      )}
    </>
  );
};

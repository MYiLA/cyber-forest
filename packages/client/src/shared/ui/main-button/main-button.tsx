import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import cn from "classnames";
import styles from "./main-button.module.scss";

interface TButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  extraClassName?: string;
  className?: string;
}

export const MainButton: FC<TButtonProps> = ({
  children,
  extraClassName,
  className,
  ...rest
}) => (
  <div className={cn(styles.container, className)}>
    <button className={extraClassName} {...rest}>
      {children}
    </button>
  </div>
);

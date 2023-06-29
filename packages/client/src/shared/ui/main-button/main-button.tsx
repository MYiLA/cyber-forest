import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import styles from './main-button.module.scss'
import classNames from 'classnames'

interface TButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  extraClassName?: string
  className?: string
}

export const MainButton: FC<TButtonProps> = ({
  children,
  extraClassName,
  className,
  ...rest
}) => {
  return (
    <div className={classNames(styles.container, className)}>
      <button className={extraClassName} {...rest}>
        {children}
      </button>
    </div>
  )
}

import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import buttonLb from '../../../assets/images/button-lb.svg'
import buttonRt from '../../../assets/images/button-rt.svg'
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
      <img className={styles.lb} src={buttonLb} />
      <img className={styles.rt} src={buttonRt} />
      <button className={extraClassName} {...rest}>
        {children}
      </button>
    </div>
  )
}

import styles from './main-input.module.scss'
import inputUnderline from '../../../assets/images/input-underline.svg'
import { FC, InputHTMLAttributes } from 'react'
import classNames from 'classnames'

interface TInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string
  placeholder?: string
  type?: string
  extraClassName?: string
  error?: string
  className?: string
}

export const MainInput: FC<TInputProps> = ({
  extraClassName,
  name,
  placeholder,
  type = 'text',
  error = '',
  className,
  ...rest
}) => {
  return (
    <div className={classNames(styles.container, className)}>
      <img className={styles.bottom} src={inputUnderline} />
      <input
        name={name}
        type={type}
        className={extraClassName}
        placeholder=" "
        {...rest}
      />
      <label className={styles.placeholder}>{placeholder}</label>
      <div className={styles.error}>{error}</div>
    </div>
  )
}

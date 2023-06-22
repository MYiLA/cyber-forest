import styles from './main-input.module.scss'
import inputUnderlineR from '../../../assets/images/input-underline-r.svg'
import inputUnderlineL from '../../../assets/images/input-underline-l.svg'
import { FC, Fragment, InputHTMLAttributes, useCallback } from 'react'
import classNames from 'classnames'

interface TInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string
  placeholder?: string
  type?: string
  extraClassName?: string
  error?: string
  className?: string
  align?: string
}

export const MainInput: FC<TInputProps> = ({
  extraClassName,
  name,
  placeholder,
  type = 'text',
  error = '',
  className,
  align = 'left',
  ...rest
}) => {
  const DecorImage = useCallback(() => {
    return (
      <>
        {align === 'left' ? (
          <img className={styles.bottom_right} src={inputUnderlineR} />
        ) : (
          <img className={styles.bottom_left} src={inputUnderlineL} />
        )}
      </>
    )
  }, [align])

  return (
    <Fragment>
      {type === 'checkbox' ? (
        <div className={classNames(styles.custom_checkbox, className)}>
          <input
            type={type}
            name={name}
            className={extraClassName}
            {...rest}
            id="customCheckbox"
          />
          <label htmlFor="customCheckbox"></label>
        </div>
      ) : (
        <div
          className={classNames(
            styles.container,
            className,
            align === 'right' ? styles.right_direction : ''
          )}>
          <DecorImage />
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
      )}
    </Fragment>
  )
}

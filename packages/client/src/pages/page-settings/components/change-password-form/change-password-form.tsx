import { useTheme } from '@hooks/use-theme'
import { Fields, useForm } from '@hooks/use-form'
import { useUserData } from '@hooks/use-user-data'
import styles from '@pages/page-settings/page-settings.module.scss'
import { MainInput } from '@ui/main-input/main-input'
import { BaseSyntheticEvent, FormEvent } from 'react'
import classNames from 'classnames'
import { Theme } from '@config/constants'

const validators = {
  oldPassword: {
    required: true,
    rule: /^(?=.*\d)(?=.*[A-Z])\S{8,40}$/g,
    message: '8-40 символов, обязательны цифры и заглавные буквы',
  },
  newPassword: {
    required: true,
    rule: /^(?=.*\d)(?=.*[A-Z])\S{8,40}$/g,
    message: '8-40 символов, обязательны цифры и заглавные буквы',
  },
  repeatPassword: {
    required: true,
    rule: /^(?=.*\d)(?=.*[A-Z])\S{8,40}$/g,
    message: '8-40 символов, обязательны цифры и заглавные буквы',
  },
}

const initialForm = {
  oldPassword: '',
  newPassword: '',
  repeatPassword: '',
}

export const ChangePasswordForm = () => {
  const { themeName } = useTheme()

  const { error } = useUserData()

  const { form, onChange, validate, onFocus, onBlur } = useForm(
    initialForm as unknown as Fields,
    validators
  )

  const { toChangePassword } = useUserData()

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (form.newPassword === form.repeatPassword) {
      toChangePassword({
        oldPassword: form.oldPassword as string,
        newPassword: form.newPassword as string,
      })
    }
  }

  const onErroredRepeat = (e: BaseSyntheticEvent) => {
    if (e.target.value !== form.newPassword) {
      if (!document.querySelector('.' + styles.password_error)) {
        const error = document.createElement('div')
        error.innerText = 'пароли не совпадают'
        error.classList.add(styles.password_error)
        e.target.after(error)
      }
    } else {
      const error = document.querySelector('.' + styles.password_error)

      if (error) {
        error.remove()
      }
    }
  }

  return (
    <form className={styles.password}>
      <h3 className={styles.personal_header}>личные данные</h3>
      <MainInput
        name="oldPassword"
        placeholder="старый пароль"
        defaultValue={form.oldPassword as string}
        onChange={onChange}
        // className={styles.personal_input}
        error={validate.oldPassword.error}
        onFocus={onFocus}
        onBlur={onBlur}
        type={'password'}
      />
      <MainInput
        name="newPassword"
        placeholder="новый пароль"
        defaultValue={form.newPassword as string}
        onChange={onChange}
        error={validate.newPassword.error}
        onFocus={onFocus}
        onBlur={onBlur}
        type={'password'}
      />
      <MainInput
        name="repeatPassword"
        placeholder="повторите пароль"
        defaultValue={form.repeatPassword as string}
        onChange={onChange}
        error={validate.repeatPassword.error}
        onFocus={onFocus}
        onBlur={onErroredRepeat}
        type={'password'}
      />
      <button
        type="submit"
        onClick={onSubmit}
        disabled={
          !form.oldPassword || !form.newPassword || !form.repeatPassword
        }
        className={classNames(styles.personal_submit, styles.password_submit, {
          [styles.personal_submit_purple]: themeName === Theme.Purple,
          [styles.personal_submit_neon]: themeName === Theme.Neon,
        })}>
        сбросить пароль
      </button>
      {error && <span> {error} </span>}
    </form>
  )
}

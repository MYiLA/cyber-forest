import { FormEvent } from 'react'
import { NavLink } from 'react-router-dom'

import { PATH } from '../../../core/config/constants'
import { MainInput } from '../../../shared/ui/main-input/main-input'
import { MainButton } from '../../../shared/ui/main-button/main-button'
import { TFields, TValidators, useForm } from '../../../shared/hooks/use-form'
import { DialogWindow } from '../../../shared/ui/dialog-window/dialog-window'
import styles from './page-login.module.scss'
import { useAuth } from '../../../shared/hooks/use-auth'
import { TUserLogin } from '../../../core/config/user-types'

const validators: TValidators = {
  login: {
    required: true,
    rule: /^(?![\d+]+$)[a-zа-я0-9+_-]{3,20}$/gi,
    message: '3-20 символов без пробелов, буквы обязательно',
  },
  password: {
    required: true,
    rule: /^(?=.*\d)(?=.*[A-Z])\S{8,40}$/g,
    message: '8-40 символов, обязательны цифры и заглавные буквы',
  },
}

const initialForm: TFields = {
  login: '',
  password: '',
}

export const PageLogin = () => {
  const { form, onChange, validate, onFocus, onBlur, validateAllFields } =
    useForm(initialForm, validators)

  const { toLogin, error } = useAuth()

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (validateAllFields()) {
      toLogin(form as TUserLogin)
    }
  }

  return (
    <div className={styles.container}>
      <DialogWindow>
        <div className={styles.inside}>
          <h2>Вход в аккаунт</h2>
          <form onSubmit={onSubmit} className="mt-5 w-100" noValidate>
            <MainInput
              autoFocus
              name="login"
              placeholder="Логин"
              value={form.login as string}
              onChange={onChange}
              className={styles.inputs}
              error={validate.login.error}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <MainInput
              name="password"
              type="password"
              placeholder="Пароль"
              value={form.password as string}
              onChange={onChange}
              className={styles.inputs}
              error={validate.password.error}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <div className={styles.form_buttons}>
              <MainButton
                type="submit"
                extraClassName="ml-10 mr-10"
                className="mr-5">
                Войти
              </MainButton>
              <NavLink to={PATH.REGISTER}>Зарегистрироваться</NavLink>
            </div>
          </form>
          {error && <div className={styles.error}>{error}</div>}
        </div>
      </DialogWindow>
    </div>
  )
}

import { FormEvent } from 'react'
import { NavLink } from 'react-router-dom'

import { PATH } from '../../../core/config/constants'
import { MainInput } from '../../../shared/ui/main-input/main-input'
import { MainButton } from '../../../shared/ui/main-button/main-button'
import { useForm } from '../../../shared/hooks/use-form'
import { DialogWindow } from '../../../shared/ui/dialog-window/dialog-window'
import styles from './page-login.module.scss'

const initialForm = {
  login: '',
  password: '',
}

export const PageLogin = () => {
  const { form, onChange } = useForm(initialForm)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className={styles.container}>
      <DialogWindow>
        <div className={styles.inside}>
          <h2>Вход в аккаунт</h2>
          <form onSubmit={onSubmit} className="mt-5 w-100">
            <MainInput
              autoFocus
              name="login"
              placeholder="Логин"
              value={form.login}
              onChange={onChange}
              className={styles.inputs}
            />
            <MainInput
              name="password"
              type="password"
              placeholder="Пароль"
              value={form.password}
              onChange={onChange}
              className={styles.inputs}
            />
            <span>
              <MainButton
                type="submit"
                extraClassName="ml-10 mr-10"
                className="mt-10 mb-1 mr-5">
                Войти
              </MainButton>
              <NavLink to={PATH.REGISTER}>Зарегистрироваться</NavLink>
            </span>
          </form>
        </div>
      </DialogWindow>
    </div>
  )
}

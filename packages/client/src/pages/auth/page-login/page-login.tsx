import { FormEvent } from 'react'
import { NavLink } from 'react-router-dom'

import { PATH } from '../../../core/config/constants'
import { MainInput } from '../../../shared/ui/main-input/main-input'
import { MainButton } from '../../../shared/ui/main-button/main-button'
import { useForm } from '../../../shared/hooks/use-form'
import { DialogWindow } from '../../../shared/ui/dialog-window/dialog-window'
import styles from './page-login.module.scss'

export const PageLogin = () => {
  const { form, onChange } = useForm({ email: '', password: '' })

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className={styles.container}>
      <DialogWindow>
        <div className={styles.inside}>
          <h2>Вход в аккаунт</h2>
          <form onSubmit={onSubmit} autoComplete={'off'} className="mt-5 w-100">
            <MainInput
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={onChange}
              className={styles.inputs}
            />
            <MainInput
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={onChange}
              className={styles.inputs}
            />
            <MainButton
              type="submit"
              extraClassName="ml-10 mr-10"
              className="mt-5 mb-10">
              Войти
            </MainButton>
          </form>
          <div className={styles.steps}>
            <NavLink to={PATH.REGISTER}>Зарегистрироваться</NavLink>
            <NavLink to={PATH.FORGOT_PASSWORD}>Забыли пароль?</NavLink>
          </div>
        </div>
      </DialogWindow>
    </div>
  )
}

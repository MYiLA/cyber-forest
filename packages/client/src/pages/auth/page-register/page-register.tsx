import { useForm } from '../../../shared/hooks/use-form'
import { FormEvent } from 'react'
import styles from './page-register.module.scss'
import { DialogWindow } from '../../../shared/ui/dialog-window/dialog-window'
import { MainInput } from '../../../shared/ui/main-input/main-input'
import { MainButton } from '../../../shared/ui/main-button/main-button'
import { NavLink } from 'react-router-dom'
import { PATH } from '../../../core/config/constants'

const initialForm = {
  first_name: '',
  second_name: '',
  login: '',
  email: '',
  password: '',
  password_confirm: '',
  phone: '',
  agreement: true,
}

export const PageRegister = () => {
  const { form, onChange } = useForm(initialForm)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className={styles.container}>
      <DialogWindow>
        <div className={styles.inside}>
          <h2>Регистрация</h2>
          <form onSubmit={onSubmit} className="mt-5">
            <div className={styles.inputs_list}>
              <MainInput
                autoFocus
                name="first_name"
                placeholder="Имя"
                value={form.first_name}
                onChange={onChange}
                className={styles.inputs}
              />
              <MainInput
                name="second_name"
                placeholder="Фамилия"
                value={form.second_name}
                onChange={onChange}
                className={styles.inputs}
                align="right"
              />
              <MainInput
                name="phone"
                placeholder="Телефон"
                value={form.phone}
                onChange={onChange}
                className={styles.inputs}
              />
              <MainInput
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={onChange}
                className={styles.inputs}
                align="right"
              />
              <MainInput
                name="password"
                type="password"
                placeholder="Пароль"
                value={form.password}
                onChange={onChange}
                className={styles.inputs}
              />
              <MainInput
                name="password_confirm"
                type="password"
                placeholder="Повторите пароль"
                value={form.password_confirm}
                onChange={onChange}
                className={styles.inputs}
                align="right"
              />
              <MainInput
                name="login"
                placeholder="Логин"
                value={form.login}
                onChange={onChange}
                className={styles.inputs}
              />
            </div>
            <div className={styles.agreement}>
              <MainInput
                type="checkbox"
                name="agreement"
                checked={form.agreement}
                onChange={onChange}
              />
              <span>
                Я ознакомлен и согласен с условиями пользовательского
                соглашения.
              </span>
            </div>
            <span>
              <MainButton
                type="submit"
                extraClassName="ml-10 mr-10"
                className="mt-10 mb-1 mr-5">
                Регистрация
              </MainButton>
              <NavLink to={PATH.LOGIN}>Зарегистрированы?</NavLink>
            </span>
          </form>
        </div>
      </DialogWindow>
    </div>
  )
}

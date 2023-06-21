import { FormEvent } from 'react'
import { DialogWindow } from '../../../shared/components/dialog-window/dialog-window'
import { MainInput } from '../../../shared/ui/main-input/main-input'
import { MainButton } from '../../../shared/ui/main-button/main-button'
import styles from './page-login.module.scss'
import { useForm } from '../../../shared/hooks/use-form'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../../core/config/constants'
export const PageLogin = () => {
  const { form, onChange } = useForm({ email: '', password: '' })
  const navigate = useNavigate()

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log(form)
    navigate(PATH.HOME)
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
              className="mt-10">
              Вход
            </MainButton>
          </form>
        </div>
      </DialogWindow>
    </div>
  )
}

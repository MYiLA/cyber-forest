import { useForm } from '@hooks/use-form'
import { FormEvent, useState } from 'react'
import styles from './battle-settings.module.scss'
import { Switcher } from '@ui/switcher/switcher'
import { MainInput } from '@ui/main-input/main-input'
import { Checkbox } from '@ui/checkbox/checkbox'
import { MainButton } from '@ui/main-button/main-button'
import authApi from '@api/auth-api'
import { useTheme } from '@hooks/use-theme'
import { Theme } from '@config/constants'
import cn from 'classnames'
import { validators } from '@pages/page-lobby/validators'
import { OfflineUsersForm } from '@pages/page-lobby/components/battle-settings/offline-users-form/offline-users-form'

const initialForm = {
  type: 'online',
  players_count: '',
  table_name: '',
  has_table_password: true,
  table_password: '',
}

export const BattleSetting = () => {
  const { form, onChange, validate, onFocus, onBlur } = useForm(
    initialForm,
    validators
  )

  const [online, setOnline] = useState(true)

  const { themeName } = useTheme()

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()

    console.log(form)
  }

  const getSwitcherValue = (value: string) => {
    form.type = value

    setOnline(!online)
  }

  return (
    <div className={styles.battle}>
      <h3
        className={cn(styles.battle_header, {
          [styles.purpur]: themeName === Theme.Purple,
          [styles.neon]: themeName === Theme.Neon,
        })}>
        настройка битвы
      </h3>
      <form className={styles.form_wrapper}>
        <Switcher
          labels={['онлайн', 'офллайн']}
          state={true}
          onClick={getSwitcherValue}
        />
        {online && (
          <>
            <MainInput
              name="table_name"
              placeholder="Название стола"
              value={form.table_name as string}
              onChange={onChange}
              className={styles.battle_inputs}
              error={validate.table_name.error}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <MainInput
              name="players_count"
              placeholder="Количество игроков"
              value={form.players_count as string}
              type={'number'}
              onChange={onChange}
              className={styles.battle_inputs}
              error={validate.players_count.error}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <Checkbox
              name={'has_table_password'}
              label={'установить пароль'}
              classname={styles.battle_checkbox}
              value={form.has_table_password as boolean}
              onClick={onChange}
            />
            <MainInput
              autoComplete={'off'}
              name="table_password"
              placeholder="Пароль"
              value={form.table_password as string}
              onChange={onChange}
              type={'password'}
              disabled={!form.has_table_password as boolean}
              className={styles.battle_inputs}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <div className={styles.battle_buttons}>
              <MainButton
                type="submit"
                disabled={
                  !form.table_name ||
                  !form.players_count ||
                  (form.has_table_password ? !form.table_password : false)
                }
                onClick={onSubmit}
                extraClassName={cn({
                  [styles.button_purpur]: themeName === Theme.Purple,
                  [styles.button_neon]: themeName !== Theme.Purple,
                })}
                className="mr-5">
                создать битву
              </MainButton>
              <MainButton
                type="button"
                onClick={() => {
                  authApi.userLogout()
                }}
                extraClassName={cn({
                  [styles.button_purpur]: themeName === Theme.Purple,
                  [styles.button_neon]: themeName !== Theme.Purple,
                })}
                className="mr-5">
                выход
              </MainButton>
            </div>
          </>
        )}
        {!online && <OfflineUsersForm />}
      </form>
    </div>
  )
}

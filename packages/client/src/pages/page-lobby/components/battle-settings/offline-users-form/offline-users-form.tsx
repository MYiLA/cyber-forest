import { useForm } from '@hooks/use-form'
import { useTheme } from '@hooks/use-theme'
import styles from '@pages/page-lobby/components/battle-settings/battle-settings.module.scss'
import { MainInput } from '@ui/main-input/main-input'
import cn from 'classnames'
import { Theme } from '@config/constants'
import { MainButton } from '@ui/main-button/main-button'
import { FormEvent } from 'react'

const initialForm = {
  user1: '',
  user2: '',
  user3: '',
  user4: '',
}
const validators = {
  user1: {
    required: true,
    rule: /^[a-zA-Z0-9]{1,20}$/,
    message: '1-20 символов, буквы и цифры',
  },
  user2: {
    required: true,
    rule: /^[a-zA-Z0-9]{1,20}$/,
    message: '1-20 символов, буквы и цифры',
  },
  user3: {
    required: false,
    rule: /^[a-zA-Z0-9]{1,20}$/,
    message: '1-20 символов, буквы и цифры',
  },
  user4: {
    required: false,
    rule: /^[a-zA-Z0-9]{1,20}$/,
    message: '1-20 символов, буквы и цифры',
  },
}

export const OfflineUsersForm = () => {
  const { form, onChange, validate, onFocus, onBlur } = useForm(
    initialForm,
    validators
  )

  const { themeName } = useTheme()

  const onClick = (event: FormEvent) => {
    event.preventDefault()
  }

  return (
    <>
      <MainInput
        name="user1"
        placeholder="игрок 1"
        value={form.user1 as string}
        onChange={onChange}
        className={styles.battle_inputs}
        error={validate.user1.error}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <MainInput
        name="user2"
        placeholder="игрок 2"
        value={form.user2 as string}
        onChange={onChange}
        className={styles.battle_inputs}
        error={validate.user2.error}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <MainInput
        name="user3"
        placeholder="игрок 3"
        value={form.user3 as string}
        onChange={onChange}
        className={styles.battle_inputs}
        error={validate.user3.error}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <MainInput
        name="user4"
        placeholder="игрок 4"
        value={form.user4 as string}
        onChange={onChange}
        className={styles.battle_inputs}
        error={validate.user4.error}
        onFocus={onFocus}
        onBlur={onBlur}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <MainButton
          type="submit"
          disabled={!form.user1 || !form.user2}
          onClick={onClick}
          extraClassName={cn({
            [styles.button_purpur]: themeName === Theme.Purple,
            [styles.button_neon]: themeName !== Theme.Purple,
          })}
          style={{ display: 'block', margin: '0 auto' }}
          className="mr-5">
          создать битву
        </MainButton>
      </div>
    </>
  )
}

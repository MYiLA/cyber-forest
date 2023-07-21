import React, { BaseSyntheticEvent, FC } from 'react'
import cn from 'classnames'
import commonStyles from '@pages/page-lobby/components/active-forum-topic/active-forum-topic.module.scss'
import { Theme } from '@config/constants'
import { useTheme } from '@hooks/use-theme'
import styles from './new-topic-form.module.scss'
import close from '@images/close.svg'
import { useForm } from '@hooks/use-form'
import { MainButton } from '@ui/main-button/main-button'

type NewTopicFormProps = {
  title: string
  onClose: () => void
}

const validators = {
  description: {
    required: true,
    rule: '/^.+$/\n',
    message: 'описание не должно быть пустым',
  },
}

export const NewTopicForm: FC<NewTopicFormProps> = ({ title, onClose }) => {
  const { themeName } = useTheme()

  const initialForm = {
    title: title,
    description: '',
  }

  const { form, onChange, onFocus, onBlur } = useForm(initialForm, validators)

  return (
    <div
      className={cn(commonStyles.layout, {
        [commonStyles.purple]: themeName === Theme.Purple,
        [commonStyles.neon]: themeName !== Theme.Purple,
      })}>
      <div
        style={{ width: 600, height: 500, position: 'relative' }}
        className={cn(commonStyles.modal_wrapper, {
          [commonStyles.modal_wrapper_purple]: themeName === Theme.Purple,
          [commonStyles.modal_wrapper_neon]: themeName !== Theme.Purple,
        })}>
        <button className={commonStyles.modal_close} onClick={onClose}>
          <img src={close} alt={'иконка закрытия'} />
        </button>
        <h3 className={commonStyles.modal_header}>{title}</h3>
        <form>
          <label className={styles.text_input_label}>описание темы</label>
          <textarea
            name="description"
            placeholder="введите описание темы"
            rows={10}
            value={form.description as string}
            onChange={onChange as (e: BaseSyntheticEvent) => void}
            className={styles.text_input}
            onFocus={onFocus as (e: BaseSyntheticEvent) => void}
            onBlur={onBlur as (e: BaseSyntheticEvent) => void}
          />
          <MainButton
            type="button"
            onClick={() => {
              console.log(form)
              onClose()
            }}
            disabled={!form.description}
            extraClassName={cn(styles.button, {
              [styles.button_purple]: themeName === Theme.Purple,
              [styles.button_neon]: themeName !== Theme.Purple,
            })}
            className={styles.button_container}>
            создать
          </MainButton>
        </form>
      </div>
    </div>
  )
}

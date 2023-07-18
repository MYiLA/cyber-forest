import styles from './switcher.module.scss'
import { BaseSyntheticEvent, ReactElement, useEffect, useState } from 'react'
import { useTheme } from '@hooks/use-theme'
import { Theme } from '@config/constants'

interface switcherProps {
  labels: string[]
  state: boolean
  onClick: (value: string) => void
}

export const Switcher = ({ labels, onClick }: switcherProps): ReactElement => {
  const [active, setActive] = useState(false)
  const [active_label, setActiveLabel] = useState(
    active ? labels[0] : labels[1]
  )
  const { themeName } = useTheme()

  useEffect(() => {
    active ? setActiveLabel(labels[1]) : setActiveLabel(labels[0])
  }, [active])

  useEffect(() => {
    onClick(active_label)
  }, [active_label])

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_label}>
        <span
          className={
            active_label === labels[0]
              ? `${styles.active} ${
                  themeName === Theme.Purple
                    ? styles.active_purpur
                    : styles.active_neon
                }`
              : `${styles.unactive} ${
                  themeName === Theme.Purple
                    ? styles.unactive_purpur
                    : styles.unactive_neon
                }`
          }>
          {labels[0]}
        </span>
        <span
          className={
            active_label === labels[1]
              ? `${styles.active} ${
                  themeName === Theme.Purple
                    ? styles.active_purpur
                    : styles.active_neon
                }`
              : `${styles.unactive} ${
                  themeName === Theme.Purple
                    ? styles.unactive_purpur
                    : styles.unactive_neon
                }`
          }>
          {labels[1]}
        </span>
      </div>
      <label className={styles.switch}>
        <input
          type="checkbox"
          onInput={(e: BaseSyntheticEvent) => {
            e.preventDefault()
            setActive(!active)
          }}
        />
        <div
          className={`${styles.slider} ${
            themeName === Theme.Purple
              ? styles.slider_purpur
              : styles.slider_neon
          }`}
        />
      </label>
    </div>
  )
}

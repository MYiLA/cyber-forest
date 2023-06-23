import styles from './dialog-window.module.scss'
import cornerLt from '@images/win-corner-lt.svg'
import cornerLb from '@images/win-corner-lb.svg'
import cornerRt from '@images/win-corner-rt.svg'
import cornerRb from '@images/win-corner-rb.svg'
import { FC, ReactNode } from 'react'

export const DialogWindow: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={styles.window}>
      <div className={styles.inside_one}>
        <img className={styles.lt} src={cornerLt} alt="рамка слева сверху" />
        <img className={styles.lb} src={cornerLb} alt="рамка слева снизу" />
        <img className={styles.rt} src={cornerRt} alt="рамка справа сверху" />
        <img className={styles.rb} src={cornerRb} alt="рамка справа снизу" />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}

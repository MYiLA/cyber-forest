import styles from './dialog-window.module.scss'
import cornerLt from '../../../assets/images/win-corner-lt.svg'
import cornerLb from '../../../assets/images/win-corner-lb.svg'
import cornerRt from '../../../assets/images/win-corner-rt.svg'
import cornerRb from '../../../assets/images/win-corner-rb.svg'
import { FC, ReactNode } from 'react'

export const DialogWindow: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={styles.window}>
      <div className={styles.inside_one}>
        <img className={styles.lt} src={cornerLt} />
        <img className={styles.lb} src={cornerLb} />
        <img className={styles.rt} src={cornerRt} />
        <img className={styles.rb} src={cornerRb} />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}

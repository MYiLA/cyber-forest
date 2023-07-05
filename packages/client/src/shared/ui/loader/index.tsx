import { Modal } from '@ui/modal'
import styles from './loader.module.scss'
import cn from 'classnames'

const LoadingText = () => {
  return (
    <div className={styles.wrapper_loading}>
      <div className={styles.text}>Загрузка</div>
      <div className={styles.inner}>
        <div className={cn(styles.loading, styles.up)}></div>
        <div className={cn(styles.loading, styles.down)}></div>
      </div>
    </div>
  )
}

export const Loader = () => {
  return (
    <Modal open>
      <LoadingText />
    </Modal>
  )
}

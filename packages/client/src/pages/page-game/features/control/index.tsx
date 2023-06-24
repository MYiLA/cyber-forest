import { MainButton } from '@shared/ui/main-button/main-button'
import styles from './control.module.scss'

export const Control: React.FC = () => {
  return (
    <div className={styles.control}>
      <MainButton type="button" className={styles.btn}>
        Готово
      </MainButton>
      <MainButton type="button" className={styles.btn}>
        Сдаться
      </MainButton>
      <MainButton type="button" className={styles.guide_btn}>
        Гайд
      </MainButton>
    </div>
  )
}

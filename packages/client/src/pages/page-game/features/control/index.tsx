import { MainButton } from '@shared/ui/main-button/main-button'
import styles from './control.module.scss'
import { Guide } from '@pages/page-game/guide'

type OpenButtonProps = {
  onClick: () => void
}
const OpenGuideButton = ({ onClick }: OpenButtonProps) => {
  return (
    <MainButton type="button" onClick={onClick} className={styles.guide_btn}>
      Гайд
    </MainButton>
  )
}

export const Control = () => {
  return (
    <div className={styles.control}>
      <MainButton type="button" className={styles.btn}>
        Готово
      </MainButton>
      <MainButton type="button" className={styles.btn}>
        Сдаться
      </MainButton>
      <Guide OpenComponent={OpenGuideButton} />
    </div>
  )
}

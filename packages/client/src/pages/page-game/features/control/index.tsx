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

type ControlProps = {
  onDone?: () => void
}

export const Control = ({ onDone }: ControlProps) => {
  const onDoneHandler = () => {
    if (!onDone) return
    onDone()
  }

  return (
    <div className={styles.control}>
      <MainButton type="button" className={styles.btn} onClick={onDoneHandler}>
        Готово
      </MainButton>
      <MainButton type="button" className={styles.btn}>
        Сдаться
      </MainButton>
      <Guide OpenComponent={OpenGuideButton} />
    </div>
  )
}

import { Modal } from '@ui/modal'
import { useState } from 'react'
import styles from './loose-screen.module.scss'
import cyberCat from './images/cyber-cat.png'
import cyberFox from './images/cyber-fox.png'
import { ScreenBlock } from '../screen-block'
import { BackToLobbyButton } from '../back-to-lobby-button'

type Props = {
  onClose?: () => void
}
// TODO: Точно такая же переменная в модалке, по хорошему надо вынести в одну
const ANIMATION_DURATION_MS = 193

export const LooseScreen = (props: Props) => {
  const { onClose } = props
  const [open, setOpen] = useState(true)
  const handleClose = () => {
    setOpen(false)
    // Чтоб успело вначале закрыться, а потом отработать логика
    setTimeout(() => onClose?.(), ANIMATION_DURATION_MS)
  }
  return (
    <Modal open={open} onClose={handleClose}>
      <ScreenBlock className={styles.loose_screen}>
        <div className={styles.regret_wrapper}>
          <h3 className={styles.regret_top}>О нет...</h3>
          <h3 className={styles.regret_bottom}>Вы проиграли</h3>
        </div>
        <p className={styles.motivation_text}>
          Но не отчаивайтесь. В следующий раз вам обязательно повезёт
        </p>
        <div className={styles.bottom}>
          <img src={cyberCat} alt="Cyber cat" />
          <BackToLobbyButton />
          <img src={cyberFox} alt="Cyber fox" />
        </div>
      </ScreenBlock>
    </Modal>
  )
}

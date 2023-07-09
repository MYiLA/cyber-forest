import { Modal } from '@ui/modal'
import { useState } from 'react'
import eagleImg from './images/cyber-eagle.png'
import foxImg from './images/cyber-fox.png'
import styles from './wineer-screen.module.scss'
import cn from 'classnames'
import { ScreenBlock } from '../screen-block'
import { BackToLobbyButton } from '../back-to-lobby-button'

export const WinnerScreen = () => {
  const [open, setOpen] = useState(true)
  const handleClose = () => setOpen(false)
  return (
    <Modal open={open} onClose={handleClose}>
      <ScreenBlock className={styles.winner_screen}>
        <div className={styles.congratulation_wrapper}>
          <h3 className={styles.congratulation_top}>Поздравляем</h3>
          <h3 className={styles.congratulation_bottom}>Вы выиграли!</h3>
        </div>
        <div className={styles.score_wrapper}>
          <img
            src={eagleImg}
            className={styles.score_image}
            alt="Cyber Eagle"
          />
          <div className={styles.score_info}>
            <h4 className={cn(styles.score_info__title)}>ваш рейтинг</h4>
            <p>51 место в топ100</p>
            <div className={styles.score_info__glory}>
              <p>слава</p>
              <p>1023</p>
            </div>
            <BackToLobbyButton className={styles.score_info__button} />
          </div>
          <img src={foxImg} className={styles.score_image} alt="Cyber Fox" />
        </div>
      </ScreenBlock>
    </Modal>
  )
}

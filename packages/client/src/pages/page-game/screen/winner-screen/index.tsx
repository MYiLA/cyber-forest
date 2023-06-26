import { Modal } from '@ui/modal'
import { useState } from 'react'
import eagleImg from './images/cyber-eagle.png'
import foxImg from './images/cyber-fox.png'
import s from './wineer-screen.module.scss'
import cn from 'classnames'
import { ScreenBlock } from '../screen-block'
import { BackToLobbyButton } from '../back-to-lobby-button'

export const WinnerScreen = () => {
  const [open, setOpen] = useState(true)
  const handleClose = () => setOpen(false)
  return (
    <Modal open={open} onClose={handleClose}>
      <ScreenBlock className={s.winner_screen}>
        <div className={s.congratulation_wrapper}>
          <h3 className={s.congratulation_top}>Поздравляем</h3>
          <h3 className={s.congratulation_bottom}>Вы выиграли!</h3>
        </div>
        <div className={s.score_wrapper}>
          <img src={eagleImg} className={s.score_image} alt="Cyber Eagle" />
          <div className={s.score_info}>
            <h4 className={cn(s.score_info__title)}>ваш рейтинг</h4>
            <p>51 место в топ100</p>
            <div className={s.score_info__glory}>
              <p>слава</p>
              <p>1023</p>
            </div>
            <BackToLobbyButton className={s.score_info__button} />
          </div>
          <img src={foxImg} className={s.score_image} alt="Cyber Fox" />
        </div>
      </ScreenBlock>
    </Modal>
  )
}

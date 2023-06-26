import { Modal } from '@ui/modal'
import { useState } from 'react'
import s from './loose-screen.module.scss'
import cyberCat from './images/cyber-cat.png'
import cyberFox from './images/cyber-fox.png'
import { ScreenBlock } from '../screen-block'
import { BackToLobbyButton } from '../back-to-lobby-button'

export const LooseScreen = () => {
  const [open, setOpen] = useState(true)
  const handleClose = () => setOpen(false)
  return (
    <Modal open={open} onClose={handleClose}>
      <ScreenBlock className={s.loose_screen}>
        <div className={s.regret_wrapper}>
          <h3 className={s.regret_top}>О нет...</h3>
          <h3 className={s.regret_bottom}>Вы проиграли</h3>
        </div>
        <p className={s.motivation_text}>
          Но не отчаивайтесь. В следующий раз вам обязательно повезёт
        </p>
        <div className={s.bottom}>
          <img src={cyberCat} alt="Cyber cat" />
          <BackToLobbyButton />
          <img src={cyberFox} alt="Cyber fox" />
        </div>
      </ScreenBlock>
    </Modal>
  )
}

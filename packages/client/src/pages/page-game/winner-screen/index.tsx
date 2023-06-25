import { Backdrop } from '@ui/backdrop'
import { useState } from 'react'
import eagleImg from './images/cyber-eagle.png'
import foxImg from './images/cyber-fox.png'
import s from './wineer-screen.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '@store/store'

export const WinnerScreen = () => {
  const [open, setOpen] = useState(true)
  const { themeName } = useSelector((store: RootState) => store.theme)
  const handleClose = () => setOpen(false)
  return (
    <Backdrop open={open} onClick={handleClose}>
      <div className={s.winner_screen_wrapper}>
        <div>
          <h3>Поздравляем</h3>
          <h3>Вы выиграли!</h3>
        </div>
        <div>
          <img src={eagleImg} alt="Cyber Eagle" />
          <div>
            <h4>ваш рейтинг</h4>
            <p>51 место в топ100</p>
            <div>
              <p>слава</p>
              <p>1023</p>
            </div>
          </div>
          <img src={foxImg} alt="Cyber Fox" />
        </div>
      </div>
    </Backdrop>
  )
}

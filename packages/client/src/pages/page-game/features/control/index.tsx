import { MainButton } from '@shared/ui/main-button/main-button'
import styles from './control.module.scss'
import { Guide } from '@pages/page-game/guide'
import { useState } from 'react'
import { LooseScreen } from '@pages/page-game/screen'
import { useNavigate } from 'react-router-dom'
import { PATH } from '@config/constants'

// TODO: Код читаемый, но можно лучше) Сделать LooseScreen по аналогии с Guide

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
  const [looseState, setLooseState] = useState(false)
  const navigate = useNavigate()
  const onDoneHandler = () => {
    if (!onDone) return
    onDone()
  }

  const handleLoose = () => {
    setLooseState(true)
  }
  const handleCloseLooseScreen = () => {
    navigate(PATH.LOBBY)
  }

  return (
    <div className={styles.control}>
      <MainButton type="button" className={styles.btn} onClick={onDoneHandler}>
        Готово
      </MainButton>
      <MainButton type="button" className={styles.btn} onClick={handleLoose}>
        Сдаться
      </MainButton>
      <Guide OpenComponent={OpenGuideButton} />
      {looseState && <LooseScreen onClose={handleCloseLooseScreen} />}
    </div>
  )
}

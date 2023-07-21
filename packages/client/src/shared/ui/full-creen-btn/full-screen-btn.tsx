import { FC, useState } from 'react'
import styles from './full-screen-btn.module.scss'
import image from '@images/full-screen.svg'

type FullScreenBtnProps = {
  active: boolean
  extraClass?: string
}

export const FullScreenBtn: FC<FullScreenBtnProps> = ({
  active,
  extraClass,
}) => {
  const [fullScreen, setFullScreen] = useState(active)

  const onClick = () => {
    const requestMethod =
      document.documentElement.requestFullscreen ||
      document.documentElement.webkitRequestFullscreen ||
      document.documentElement.webkitRequestFullScreen ||
      document.documentElement.mozRequestFullScreen ||
      document.documentElement.msRequestFullscreen

    if (fullScreen && requestMethod) {
      requestMethod.apply(document.documentElement)
    } else {
      document.exitFullscreen()
    }

    setFullScreen(!fullScreen)
  }

  return (
    <button className={`${styles.button} ${extraClass}`} onClick={onClick}>
      <img src={image} alt={'иконка полный экран'} />
    </button>
  )
}

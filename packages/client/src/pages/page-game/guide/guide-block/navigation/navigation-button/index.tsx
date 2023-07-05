import styles from './navigation-button.module.scss'
import { useTheme } from '@hooks/use-theme'
import { Theme } from '@config/constants'
import { ReactComponent as BottomRightCorner } from './corners/bottom-right-corner.svg'
import { ReactComponent as TopLeftCorner } from './corners/top-left-corner.svg'
import cn from 'classnames'

type Props = {
  text: string
  isActive?: boolean
  onClick: () => void
}

export const NavigationButton = (props: Props) => {
  const { text, isActive = false, onClick } = props
  const { themeName } = useTheme()

  const isNeon = !isActive && themeName === Theme.Neon
  const isPurple = !isActive && themeName === Theme.Purple

  return (
    <button
      onClick={onClick}
      className={cn(styles.navigation_button, {
        [styles.neon]: isNeon,
        [styles.purple]: isPurple,
        [styles.active]: isActive,
      })}>
      <TopLeftCorner className={styles.top_left_corner} />
      <BottomRightCorner className={styles.bottom_right_corner} />
      {text}
    </button>
  )
}

import cn from 'classnames'
import styles from './screen.module.scss'
import { Theme } from '@config/constants'
import { MainButton } from '@ui/main-button/main-button'
import { useTheme } from '@hooks/use-theme'

type Props = {
  className?: string
}
export const BackToLobbyButton = (props: Props) => {
  const { themeName } = useTheme()
  const { className } = props
  return (
    <MainButton
      className={cn(styles.lobby_button, className, {
        [styles.neon]: themeName === Theme.Neon,
        [styles.purple]: themeName === Theme.Purple,
      })}>
      Вернуться в лобби
    </MainButton>
  )
}

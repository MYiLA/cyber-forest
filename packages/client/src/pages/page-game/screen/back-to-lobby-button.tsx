import cn from 'classnames'
import s from './screen.module.scss'
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
      className={cn(s.lobby_button, className, {
        [s.neon]: themeName === Theme.Neon,
        [s.purple]: themeName === Theme.Purple,
      })}>
      Вернуться в лобби
    </MainButton>
  )
}

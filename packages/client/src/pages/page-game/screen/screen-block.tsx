import { ReactNode } from 'react'
import cn from 'classnames'
import s from './screen.module.scss'
import { Theme } from '@config/constants'
import { useTheme } from '@hooks/use-theme'
import winCornerLtImg from '@images/win-corner-lt.svg'
import winCornerLbImg from '@images/win-corner-lb.svg'
import winCornerRtImg from '@images/win-corner-rt.svg'

type Props = {
  children: ReactNode
  className?: string
}

export const ScreenBlock = (props: Props) => {
  const { themeName } = useTheme()
  const { children, className } = props
  return (
    <div
      className={cn(s.screen_wrapper, className, {
        [s.purple]: themeName === Theme.Purple,
        [s.neon]: themeName === Theme.Neon,
      })}>
      <img
        src={winCornerLtImg}
        className={cn(s.border, s.border_lt)}
        alt={'win corner'}
      />
      <img
        src={winCornerLbImg}
        className={cn(s.border, s.border_lb)}
        alt={'win corner'}
      />
      <img
        src={winCornerRtImg}
        className={cn(s.border, s.border_rt)}
        alt={'win corner'}
      />
      {children}
    </div>
  )
}

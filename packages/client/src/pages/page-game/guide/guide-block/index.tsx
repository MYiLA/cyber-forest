import { ReactNode, useEffect, useRef } from 'react'
import { useTheme } from '@hooks/use-theme'
import { ReactComponent as TopRightCorner } from './corners/top-right-corner.svg'
import { ReactComponent as BottomLeftCorner } from './corners/bottom-left-corner.svg'
import cn from 'classnames'
import styles from './guide-block.module.scss'
import { Theme } from '@config/constants'
import { Navigation } from './navigation'

type Props = {
  children: ReactNode
  open: boolean
}

export const GuideBlock = (props: Props) => {
  const { children, open } = props
  const { themeName } = useTheme()
  const ref = useRef<null | HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let timeout: NodeJS.Timeout
    if (open) {
      timeout = setTimeout(() => {
        el.style.transform = 'translateX(0)'
      }, 100)
    } else {
      el.style.transform = 'translateX(100%)'
    }

    return () => clearTimeout(timeout)
  }, [open])

  const initialStyle = {
    transform: 'translateX(100%)',
  }
  return (
    <div
      ref={ref}
      style={initialStyle}
      className={cn(styles.guide_wrapper, {
        [styles.neon]: themeName === Theme.Neon,
        [styles.purple]: themeName === Theme.Purple,
      })}>
      <TopRightCorner className={cn(styles.corner, styles.top_right)} />
      <BottomLeftCorner className={cn(styles.corner, styles.bottom_left)} />
      <Navigation className={styles.navigation} />
      {children}
    </div>
  )
}

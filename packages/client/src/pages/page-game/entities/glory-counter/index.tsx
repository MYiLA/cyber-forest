import cn from 'classnames'
import { PlayerType } from '../../widgets/game/constants'
import styles from './glory-counter.module.scss'

type GloryCounterProps = {
  gloryCount: number
  playerType: PlayerType
}

export const GloryCounter = ({ gloryCount, playerType }: GloryCounterProps) => {
  const className = cn(styles.glory, styles[playerType.toLowerCase()])
  return <div className={className}>{gloryCount}</div>
}

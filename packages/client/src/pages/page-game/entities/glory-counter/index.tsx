import classNames from 'classnames'
import { PlayerType } from '../../widgets/game/constants'
import styles from './glory-counter.module.scss'

type GloryCounterProps = {
  gloryCount: number
  playerType: PlayerType
}

export const GloryCounter: React.FC<GloryCounterProps> = ({
  gloryCount,
  playerType,
}) => {
  const className = classNames(styles.glory, styles[playerType.toLowerCase()])
  return <div className={className}>{gloryCount}</div>
}

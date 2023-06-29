import { PlayerType } from '../../widgets/game/constants'
import styles from './time-counter.module.scss'

type TimeCounterProps = {
  gloryCount?: number
  playerType?: PlayerType
}

export const TimeCounter: React.FC<TimeCounterProps> = () => {
  return <span className={styles.counter}>01:00</span>
}

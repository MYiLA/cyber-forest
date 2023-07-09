import styles from './leaders.module.scss'
import { UserLeaderDto } from '../types'

type Props = {
  user: UserLeaderDto
}

export const UserRow = (props: Props) => {
  const {
    user: { name, points, avatar },
  } = props
  return (
    <div className={styles.user_row}>
      <img src={avatar} className={styles.avatar} alt={`${name} avatar`} />
      <div className={styles.name_wrapper}>
        <h4>{name}</h4>
      </div>
      <div className={styles.points_wrapper}>
        <h4>{points}</h4>
      </div>
    </div>
  )
}

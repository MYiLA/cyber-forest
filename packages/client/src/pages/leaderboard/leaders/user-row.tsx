import s from './leaders.module.scss'
import { UserLeaderDto } from '../types'

type Props = {
  user: UserLeaderDto
}

export const UserRow = (props: Props) => {
  const {
    user: { name, points, avatar },
  } = props
  return (
    <div className={s.user_row}>
      <img src={avatar} className={s.avatar} alt={`${name} avatar`} />
      <div className={s.name_wrapper}>
        <h4>{name}</h4>
      </div>
      <div className={s.points_wrapper}>
        <h4>{points}</h4>
      </div>
    </div>
  )
}

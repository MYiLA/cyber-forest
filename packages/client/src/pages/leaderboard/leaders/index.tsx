import { UserRow } from './user-row'
import s from './leaders.module.scss'
import { type UserLeaderDto } from '../types'

type Props = {
  leaders: UserLeaderDto[]
}
export const Leaders = (props: Props) => {
  const { leaders } = props
  return (
    <div className={s.leader_wrapper}>
      {leaders.map(leader => (
        <UserRow key={leader.id} user={leader} />
      ))}
    </div>
  )
}

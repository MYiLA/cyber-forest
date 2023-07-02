import s from './leaderboard.module.scss'
import { Link } from 'react-router-dom'
import { PATH } from '@config/constants'
import { Leaders } from './leaders'
import { leadersMock } from './mock'

export const PageLeaderboard = () => {
  return (
    <section className={s.leader_board}>
      <Link to={PATH.LOBBY} className={s.main_link}>
        На главную
      </Link>
      <div className={s.title_wrapper}>
        <h1 className={s.title}>Таблица лидеров</h1>
        <h2 className={s.title}>Топ - 15</h2>
      </div>
      <Leaders leaders={leadersMock} />
    </section>
  )
}

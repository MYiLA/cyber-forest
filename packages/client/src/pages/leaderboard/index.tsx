import styles from './leaderboard.module.scss'
import { Link } from 'react-router-dom'
import { PATH } from '@config/constants'
import { Leaders } from './leaders'
import { leadersMock } from './mock'

export const PageLeaderboard = () => {
  return (
    <section className={styles.leader_board}>
      <Link to={PATH.LOBBY} className={styles.main_link}>
        На главную
      </Link>
      <div className={styles.title_wrapper}>
        <h1 className={styles.title}>Таблица лидеров</h1>
        <h2 className={styles.title}>Топ - 15</h2>
      </div>
      <Leaders leaders={leadersMock} />
    </section>
  )
}

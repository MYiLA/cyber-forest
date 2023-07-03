import styles from './rating.module.scss'
import { useTheme } from '@hooks/use-theme'
import { Theme } from '@config/constants'
import { mock_rating } from '@pages/page-lobby/mocks'
import cn from 'classnames'

export const Rating = () => {
  // const { rating } = useSelector((store: RootState) => store)
  const { themeName } = useTheme()

  return (
    <div className={styles.rating}>
      <h3
        className={cn(styles.rating_title, {
          [styles.purpur]: themeName === Theme.Purple,
          [styles.neon]: themeName !== Theme.Purple,
        })}>
        рейтинг
      </h3>
      <span className={styles.rating_place}>
        {mock_rating.place} место в ТОП100
      </span>
      <div className={styles.rating_glory}>
        <span>слава</span>
        <span>{mock_rating.score}</span>
      </div>
    </div>
  )
}

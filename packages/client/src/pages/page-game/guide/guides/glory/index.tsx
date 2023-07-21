import catCard from '../assets/cat-card.png'
import catScale from '../assets/cat-scale.png'
import counters from '../assets/counters.png'
import countersColumn from '../assets/counters-column.png'
import styles from './glory.module.scss'
import { ReactComponent as Arrow } from '../assets/arrow.svg'
import { DescriptionBlock } from '../description-block'
import cn from 'classnames'

export const Glory = () => {
  return (
    <div className={styles.glory}>
      <Arrow className={cn(styles.arrow, styles.arrow_1)} />
      <Arrow className={cn(styles.arrow, styles.arrow_2)} />
      <Arrow className={cn(styles.arrow, styles.arrow_3)} />
      <Arrow className={cn(styles.arrow, styles.arrow_4)} />
      <div className={styles.top_images}>
        <img src={catCard} alt="cat card" />
        <img src={catScale} alt="cat card scaled" />
      </div>
      <DescriptionBlock text="Каждый выживший до начала следующего хода воин дает славу игроку" />
      <DescriptionBlock
        className={styles.second_desc}
        text="чтобы выиграть, игрок должен быстрее всех набрать 20 очков славы"
      />
      <img className={styles.image_align} src={counters} alt="glory counters" />
      <DescriptionBlock
        className={styles.second_desc}
        text="счетчик славы каждого игрока отображается в рейтинге и в хронике"
      />
      <img
        src={countersColumn}
        className={styles.image_align}
        alt="glory counters with description"
      />
    </div>
  )
}

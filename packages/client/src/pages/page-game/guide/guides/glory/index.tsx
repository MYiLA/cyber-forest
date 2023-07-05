import catCard from '../assets/cat-card.png'
import catScale from '../assets/cat-scale.png'
import counters from '../assets/counters.png'
import countersColumn from '../assets/counters-column.png'
import s from './glory.module.scss'
import { ReactComponent as Arrow } from '../assets/arrow.svg'
import { DescriptionBlock } from '../description-block'
import cn from 'classnames'

export const Glory = () => {
  return (
    <div className={s.glory}>
      <Arrow className={cn(s.arrow, s.arrow_1)} />
      <Arrow className={cn(s.arrow, s.arrow_2)} />
      <Arrow className={cn(s.arrow, s.arrow_3)} />
      <Arrow className={cn(s.arrow, s.arrow_4)} />
      <div className={s.top_images}>
        <img src={catCard} alt="cat card" />
        <img src={catScale} alt="cat card scaled" />
      </div>
      <DescriptionBlock text="Каждый выживший до начала следующего хода воин дает славу игроку" />
      <DescriptionBlock
        className={s.second_desc}
        text="чтобы выиграть, игрок должен быстрее всех набрать 20 очков славы"
      />
      <img className={s.image_align} src={counters} alt="glory counters" />
      <DescriptionBlock
        className={s.second_desc}
        text="счетчик славы каждого игрока отображается в рейтинге и в хронике"
      />
      <img
        src={countersColumn}
        className={s.image_align}
        alt="glory counters with description"
      />
    </div>
  )
}

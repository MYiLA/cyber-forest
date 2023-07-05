import catCard from '../assets/cat-card.png'
import catScale from '../assets/cat-scale.png'
import miniCat from '../assets/mini-cat.png'
import prepareCard from '../assets/prepare-card.png'
import powerCard from '../assets/power-card.png'
import { ReactComponent as Arrow } from '../assets/arrow.svg'
import s from './power.module.scss'
import { DescriptionBlock } from '../description-block'
import cn from 'classnames'

export const Power = () => {
  return (
    <div className={s.power}>
      <Arrow className={cn(s.arrow, s.arrow_1)} />
      <Arrow className={cn(s.arrow, s.arrow_2)} />
      <Arrow className={cn(s.arrow, s.arrow_3)} />
      <Arrow className={cn(s.arrow, s.arrow_4)} />
      <Arrow className={cn(s.arrow, s.arrow_5)} />
      <Arrow className={cn(s.arrow, s.arrow_6)} />
      <Arrow className={cn(s.arrow, s.arrow_7)} />
      <div className={s.top_images}>
        <img src={catCard} alt="cat card" />
        <img src={catScale} alt="cat card scaled" />
      </div>
      <DescriptionBlock
        className={s.top_desc}
        text="сила нужна для подготовки и найма воинов"
      />
      <img src={miniCat} className={s.mini_cat_img} alt="mini cat card" />
      <img
        className={s.prepare_card_img}
        src={prepareCard}
        alt="prepare card"
      />
      <DescriptionBlock
        className={s.first_bottom_desc}
        text="Сила дается игроку на каждый ход случайное количество от 2 до 6 единиц"
      />
      <DescriptionBlock
        className={s.second_bottom_desc}
        text="силу может увеличить воин при определeнном шансе выпадения. Шанс выпадения силы у воина обозначен в описании воина"
      />
      <img className={s.prepare_card_img} src={powerCard} alt="power card" />
    </div>
  )
}

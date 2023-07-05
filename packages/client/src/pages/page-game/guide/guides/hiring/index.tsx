import prepareCard from '../assets/prepare-card.png'
import transparentForest from '../assets/transparent-cyber-forest.png'
import cyberForest from '../assets/cyber-forest.png'
import cyberCats from '../assets/cyber-cats.png'
import bottomPartCard from '../assets/bottom-part-card.png'
import { ReactComponent as Arrow } from '../assets/arrow.svg'
import { DescriptionBlock } from '../description-block'
import s from './hiring.module.scss'
import cn from 'classnames'

export const Hiring = () => {
  return (
    <div className={s.hiring}>
      <Arrow className={cn(s.arrow, s.arrow_1)} />
      <Arrow className={cn(s.arrow, s.arrow_2)} />
      <Arrow className={cn(s.arrow, s.arrow_3)} />
      <Arrow className={cn(s.arrow, s.arrow_4)} />
      <Arrow className={cn(s.arrow, s.arrow_5)} />
      <Arrow className={cn(s.arrow, s.arrow_6)} />
      <div className={s.top_desc}>
        <img src={prepareCard} className={s.prepare_card} alt="prepare card" />
        <DescriptionBlock
          className={cn(s.desc_block, s.top_desc_block)}
          text="Если у вас достаточно силы, то вы можете нанять одного воина в киберлесу за ваш ход"
        />
      </div>
      <div className={s.middle_desc}>
        <img src={transparentForest} alt="cyber forest" />
        <div>
          <DescriptionBlock
            className={cn(s.push_text, s.desc_block)}
            text="нажмите на киберлес"
          />
          <div className={s.middle_desc_right_bottom}>
            <DescriptionBlock
              className={s.desc_block}
              text="в киберлесу можно изучить описание воинов"
            />
            <img src={cyberForest} alt="cyber forest" />
          </div>
        </div>
      </div>
      <div className={s.bottom_desc}>
        <img src={cyberCats} alt="cyber cats" />
        <div className={s.bottom_desc_right}>
          <DescriptionBlock
            className={s.desc_block}
            text="количество доступных для найма воинов ограничено"
          />
          <img src={bottomPartCard} alt="bottom part card" />
          <DescriptionBlock
            className={s.desc_block}
            text="После найма воин сразу отправляется в вашу зону отдыха"
          />
        </div>
      </div>
    </div>
  )
}

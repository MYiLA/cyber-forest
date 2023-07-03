import styles from './big-card.module.scss'
import { MainButton } from '../main-button/main-button'
import cn from 'classnames'
import { DiceSideComponent } from '../dice-side'
import { Dice } from '@pages/page-game/type'
import { AbilityInCard } from './components/ability'
import { Glory } from '../glory'
import { Energy } from '../energy'

type BigCardProps = {
  dice: Dice
}

export const BigCard = ({ dice }: BigCardProps) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.img_wrap}>
        <div className={styles.energy_wrap}>
          {dice.cost}
          <Energy className={styles.energy} />
        </div>
        <div className={styles.glory_wrap}>
          {dice.glory}
          <Glory className={styles.glory} />
        </div>
        <img className={styles.img} src={dice.img} alt={dice.title} />
      </div>
      <div className={styles.info_wrap}>
        <div className={styles.title_wrap}>
          <span className={styles.title}>{dice.title}</span>
          <MainButton type="button" className={cn(styles.btn, 'control_btn')}>
            Нанять
          </MainButton>
        </div>
        <ul className={styles.ability_list}>
          {dice.abilities.map(ability => (
            <li
              key={`${dice.title}-${ability.abilitySymbol}`}
              className={styles.ability_item}>
              <AbilityInCard ability={ability} />
            </li>
          ))}
        </ul>
        <div className={styles.dices_wrap}>
          <ul className={styles.dices_list}>
            {dice.sides.map((side, index) => (
              <li key={`side-${index}`} className={styles.dice_energy}>
                <DiceSideComponent diceSide={side} diceTitle={dice.title} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

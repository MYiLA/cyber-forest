import styles from './ability.module.scss'
import { Ability } from '@pages/page-game/type'

type AbilityInCardProps = {
  ability: Ability
}

export const AbilityInCard = ({ ability }: AbilityInCardProps) => {
  return (
    <div className={styles.wrap}>
      <i className={styles.symbol}>{ability.abilitySymbol}</i>
      <p className={styles.desc}>{ability.desc}</p>
    </div>
  )
}

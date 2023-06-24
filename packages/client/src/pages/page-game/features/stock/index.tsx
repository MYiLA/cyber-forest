import { getRandomElement } from '@shared/utils/getRandomElement'
import { UnknownDiceSide } from '../../entities/unknown-dice-side'
import { Dice } from '../../type'
import { DiceSide } from '../../widgets/game/type'
import styles from './stock.module.scss'

type StockProps = {
  dices: Dice[]
  onChoosingCubeProp?: (side: DiceSide, id: string) => void
}

export const Stock: React.FC<StockProps> = ({ dices, onChoosingCubeProp }) => {
  const onChoosingCube = (shoosedDice: Dice) => {
    if (!onChoosingCubeProp) return
    onChoosingCubeProp(getRandomElement(shoosedDice.sides), shoosedDice.id)
  }
  return (
    <div className={styles.stock}>
      <ul className={styles.list}>
        {dices.map(dice => (
          <li
            key={dice.id}
            className={styles.item}
            onClick={() => onChoosingCube(dice)}>
            <UnknownDiceSide />
          </li>
        ))}
      </ul>
      <span className={styles.title}>Инвентарь</span>
    </div>
  )
}

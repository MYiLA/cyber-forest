import { DiceSideComponent } from "@shared/ui/dice-side";
import { getRandomElement } from "@shared/utils/get-random-element";
import { Dice } from "../../type";
import { DiceSide } from "../../widgets/game/type";
import styles from "./stock.module.scss";

type StockProps = {
  dices: Dice[];
  onChoosingCubeProp?: (side: DiceSide, id: string) => void;
};

export function Stock({ dices, onChoosingCubeProp }: StockProps) {
  const onChoosingCube = (shoosedDice: Dice) => {
    if (!onChoosingCubeProp) return;
    onChoosingCubeProp(getRandomElement(shoosedDice.sides), shoosedDice.id);
  };

  return (
    <div className={styles.stock}>
      <ul className={styles.list}>
        {dices.map((dice) => (
          <li
            key={dice.id}
            className={styles.item}
            onClick={() => onChoosingCube(dice)}
          >
            <DiceSideComponent />
          </li>
        ))}
      </ul>
      <span className={styles.title}>Инвентарь</span>
    </div>
  );
}

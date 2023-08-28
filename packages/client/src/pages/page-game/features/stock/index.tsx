import { DiceSideComponent } from "@shared/ui/dice-side";
import { getRandomElement } from "@shared/utils/get-random-element";
import cn from "classnames";
import { Dice } from "../../type";
import { GameType } from "../../widgets/game/constants";
import { DiceSide } from "../../widgets/game/type";
import styles from "./stock.module.scss";

type StockProps = {
  dices: Dice[];
  gameType: GameType;
  onChoosingCubeProp?: (side: DiceSide, id: string) => void;
};

export function Stock({ dices, gameType, onChoosingCubeProp }: StockProps) {
  const onChoosingCube = (shoosedDice: Dice) => {
    if (!onChoosingCubeProp) return;
    onChoosingCubeProp(getRandomElement(shoosedDice.sides), shoosedDice.id);
  };

  return (
    <div
      className={cn(styles.stock, {
        [styles.offline]: gameType === GameType.Offline,
      })}
    >
      <ul className={styles.list}>
        {dices.map((dice, index) => (
          <li
            data-testid={`dice-test-${index}`}
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

import { isWarriorDiceSide } from "@shared/utils/is-warrior-dice-side";
import { isEnergyDiceSide } from "@shared/utils/is-energy-dice-side";
import { isSymbolDiceSide } from "@shared/utils/is-symbol-dice-side";
import { DiceSide } from "@pages/page-game/widgets/game/type";
import styles from "./dice-side.module.scss";
import { Energy } from "../energy";

type DiceSideComponentProps = {
  diceSide?: DiceSide;
  diceTitle?: string;
};

export function DiceSideComponent({
  diceSide,
  diceTitle,
}: DiceSideComponentProps) {
  if (isWarriorDiceSide(diceSide)) {
    return (
      <div className={styles.dice_warrior}>
        <div className={styles.info_wrap}>
          <div className={styles.info_top}>
            <span className={styles.level}>{diceSide.level}</span>
            <span className={styles.attack}>{diceSide.attack}</span>
          </div>
          <div className={styles.info_bottom}>
            <span className={styles.ability_symbol}>
              {diceSide.abilitySymbol ?? " "}
            </span>
            <span className={styles.defense}>{diceSide.defense}</span>
          </div>
        </div>
        <div className={styles.img_wrap}>
          <img className={styles.img} src={diceSide.image} alt={diceTitle} />
        </div>
      </div>
    );
  }

  if (isEnergyDiceSide(diceSide)) {
    return (
      <div
        className={styles.dice_energy}
        style={{
          backgroundColor: `rgb(${diceSide.color})`,
          color: `rgb(${diceSide.textColor})`,
        }}
      >
        {diceSide.energyCount}
        <Energy className={styles.energy} />
      </div>
    );
  }

  if (isSymbolDiceSide(diceSide)) {
    return (
      <div
        className={styles.dice_symbol}
        style={{
          backgroundColor: `rgb(${diceSide.color})`,
          color: `rgb(${diceSide.textColor})`,
        }}
      >
        {diceSide.specialAbilitySymbol}
      </div>
    );
  }

  return <div className={styles.dice_unknown}>?</div>;
}

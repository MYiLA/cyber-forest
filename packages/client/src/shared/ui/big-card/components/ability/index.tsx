import { Ability } from "@pages/page-game/type";
import styles from "./ability.module.scss";

type AbilityInCardProps = {
  ability: Ability;
};

export function AbilityInCard({ ability }: AbilityInCardProps) {
  return (
    <div className={styles.wrap}>
      <i className={styles.symbol}>{ability.abilitySymbol}</i>
      <p className={styles.desc}>{ability.desc}</p>
    </div>
  );
}

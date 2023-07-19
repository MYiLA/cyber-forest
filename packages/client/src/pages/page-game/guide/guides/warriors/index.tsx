import cn from "classnames";
import { DescriptionBlock } from "../description-block";
import catCard from "../assets/mini-cat.png";
import wolfCard from "../assets/wolf-card.png";
import wolfDesc from "../assets/wolf-desc.png";
import powerCard from "../assets/power-card.png";
import styles from "./warriors.module.scss";
import { ReactComponent as Arrow } from "../assets/arrow.svg";

export function Warriors() {
  return (
    <div className={styles.warriors}>
      <Arrow className={cn(styles.arrow, styles.arrow_1)} />
      <Arrow className={cn(styles.arrow, styles.arrow_2)} />
      <Arrow className={cn(styles.arrow, styles.arrow_3)} />
      <Arrow className={cn(styles.arrow, styles.arrow_4)} />
      <Arrow className={cn(styles.arrow, styles.arrow_5)} />
      <Arrow className={cn(styles.arrow, styles.arrow_6)} />
      <Arrow className={cn(styles.arrow, styles.arrow_7)} />
      <Arrow className={cn(styles.arrow, styles.arrow_8)} />
      <div className={styles.cat_card_desc}>
        <DescriptionBlock text="уровень" className={styles.top_mini_desc} />
        <img src={catCard} className={styles.cat_card} alt="cat card" />
        <div className={styles.top_right_desc}>
          <DescriptionBlock text="атака" className={styles.top_mini_desc} />
          <DescriptionBlock text="защита" className={styles.top_mini_desc} />
        </div>
      </div>
      <DescriptionBlock
        text="Чтобы победить, показатель атаки должен быть равен или выше, чем показатель защиты врага"
        className={styles.description}
      />
      <div className={styles.middle_images}>
        <img src={wolfDesc} alt="wolf description" />
        <img src={wolfCard} alt="wolf card" />
      </div>
      <DescriptionBlock
        text="усиленные воины используют усиленную способность"
        className={styles.description}
      />
      <DescriptionBlock
        text="шанс выпадения воина обозначен в его описании"
        className={styles.description}
      />
      <img src={powerCard} className={styles.power_card} alt="power card" />
      <DescriptionBlock
        text="Иногда может выпасть специальный символ. Его расшифровка есть в описании воина"
        className={styles.description}
      />
    </div>
  );
}

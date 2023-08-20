import cn from "classnames";
import catCard from "../assets/cat-card.png";
import catScale from "../assets/cat-scale.png";
import miniCat from "../assets/mini-cat.png";
import prepareCard from "../assets/prepare-card.png";
import powerCard from "../assets/power-card.png";
import { ReactComponent as Arrow } from "../assets/arrow.svg";
import styles from "./energy.module.scss";
import { DescriptionBlock } from "../description-block";

export function Energy() {
  return (
    <div className={styles.energy}>
      <Arrow className={cn(styles.arrow, styles.arrow_1)} />
      <Arrow className={cn(styles.arrow, styles.arrow_2)} />
      <Arrow className={cn(styles.arrow, styles.arrow_3)} />
      <Arrow className={cn(styles.arrow, styles.arrow_4)} />
      <Arrow className={cn(styles.arrow, styles.arrow_5)} />
      <Arrow className={cn(styles.arrow, styles.arrow_6)} />
      <Arrow className={cn(styles.arrow, styles.arrow_7)} />
      <div className={styles.top_images}>
        <img src={catCard} alt="cat card" />
        <img src={catScale} alt="cat card scaled" />
      </div>
      <DescriptionBlock
        className={styles.top_desc}
        text="Энергия нужна для вызова на бой и найма воинов"
      />
      <img src={miniCat} className={styles.mini_cat_img} alt="mini cat card" />
      <img
        className={styles.prepare_card_img}
        src={prepareCard}
        alt="prepare card"
      />
      <DescriptionBlock
        className={styles.first_bottom_desc}
        text="Энергия дается игроку на каждый ход случайное количество от 2 до 6 единиц"
      />
      <DescriptionBlock
        className={styles.second_bottom_desc}
        text="Энергию может увеличить воин при определенном шансе выпадения. Шанс выпадения энергии у воина обозначен в описании воина"
      />
      <img
        className={styles.prepare_card_img}
        src={powerCard}
        alt="power card"
      />
    </div>
  );
}

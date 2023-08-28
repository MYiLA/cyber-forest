import cn from "classnames";
import prepareCard from "../assets/prepare-card.png";
import transparentForest from "../assets/transparent-cyber-forest.png";
import cyberForest from "../assets/cyber-forest.png";
import cyberCats from "../assets/cyber-cats.png";
import bottomPartCard from "../assets/bottom-part-card.png";
import { ReactComponent as Arrow } from "../assets/arrow.svg";
import { DescriptionBlock } from "../description-block";
import styles from "./hiring.module.scss";

export function Hiring() {
  return (
    <div className={styles.hiring}>
      <Arrow className={cn(styles.arrow, styles.arrow_1)} />
      <Arrow className={cn(styles.arrow, styles.arrow_2)} />
      <Arrow className={cn(styles.arrow, styles.arrow_3)} />
      <Arrow className={cn(styles.arrow, styles.arrow_4)} />
      <Arrow className={cn(styles.arrow, styles.arrow_5)} />
      <Arrow className={cn(styles.arrow, styles.arrow_6)} />
      <div className={styles.top_desc}>
        <img
          src={prepareCard}
          className={styles.prepare_card}
          alt="prepare card"
        />
        <DescriptionBlock
          className={cn(styles.desc_block, styles.top_desc_block)}
          text="Если у вас достаточно энергии, то вы можете нанять одного воина в киберлесу за ваш ход"
        />
      </div>
      <div className={styles.middle_desc}>
        <img src={transparentForest} alt="cyber forest" />
        <div>
          <DescriptionBlock
            className={cn(styles.push_text, styles.desc_block)}
            text="нажмите на киберлес"
          />
          <div className={styles.middle_desc_right_bottom}>
            <DescriptionBlock
              className={styles.desc_block}
              text="в киберлесу можно изучить описание воинов"
            />
            <img src={cyberForest} alt="cyber forest" />
          </div>
        </div>
      </div>
      <div className={styles.bottom_desc}>
        <img src={cyberCats} alt="cyber cats" />
        <div className={styles.bottom_desc_right}>
          <DescriptionBlock
            className={styles.desc_block}
            text="количество доступных для найма воинов ограничено"
          />
          <img src={bottomPartCard} alt="bottom part card" />
          <DescriptionBlock
            className={styles.desc_block}
            text="После найма воин сразу отправляется в вашу зону отдыха"
          />
        </div>
      </div>
    </div>
  );
}

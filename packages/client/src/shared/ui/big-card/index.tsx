import cn from "classnames";
import { Dice } from "@pages/page-game/type";
import { createDice } from "@pages/page-game/utils/create-dice";
import { getRandomElement } from "@shared/utils/get-random-element";
import { notifyUser } from "@shared/utils/notification";
import styles from "./big-card.module.scss";
import { MainButton } from "../main-button/main-button";
import { DiceSideComponent } from "../dice-side";
import { AbilityInCard } from "./components/ability";
import { Glory } from "../glory";
import { Energy } from "../energy";

type BigCardProps = {
  dice: Dice;
  onHire?: (warrior: Dice) => void;
  limit?: number;
};

export function BigCard({ dice, onHire, limit }: BigCardProps) {
  const onHireHandler = () => {
    if (!onHire) return;
    // Проверяем, остались ли воины такого типа в киберлесу
    // Если их нет, то информируем об этом игрока
    if (limit !== undefined && limit === 0) {
      // TODO: Временно информирование игрока по фазам сделано через алерты.
      // В будущем это будет визуализировано интуитивно понятными анимациями, дизейблами и тултипами
      notifyUser(`Воинов типа ${dice.type} не осталось в киберлесе`);
      notifyUser(`Вы можете нанять других воинов`);
      return;
    }
    // Генерация кубика воина с индивидуальным id
    const warrior = createDice(dice.type);
    // Автоматически выбираем воину активную сторону
    onHire({
      ...warrior,
      activeSide: getRandomElement(warrior.sides),
    });
  };

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
          <MainButton
            type="button"
            className={cn(styles.btn, "control_btn")}
            onClick={onHireHandler}
          >
            Нанять
          </MainButton>
        </div>
        <ul className={styles.ability_list}>
          {dice.abilities.map((ability) => (
            <li
              key={`${dice.title}-${ability.abilitySymbol}`}
              className={styles.ability_item}
            >
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
  );
}

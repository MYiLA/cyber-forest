import styles from "@pages/page-info/page-info.module.scss";
import { infocards } from "@pages/page-info/constant";
import { DescriptionCard } from "@pages/page-info/entities/description-card/description-card";

export function DescriptionGameTab() {
  return (
    <>
      <div className={styles.description}>
        Киберлес - это захватывающая игра по мотиву серии настольных игр
        <a
          href="https://www.mosigra.ru/Quarriors/rules/"
          style={{ textDecoration: "underline", cursor: "pointer" }}
        >
          {" "}
          Quarriors
        </a>
        , где ваша победа зависит от удачи и умения тактически мыслить. Под
        вашим руководством в бою сойдутся модифицированные звери киберлеса.
      </div>
      <div className={styles.description} style={{ marginTop: "10px" }}>
        Гайд по игре можно найти в основном меню - лобби, доступном после
        регистрации.
      </div>
      <div className={styles.description_cards}>
        {infocards.map((card) => (
          <DescriptionCard {...card} />
        ))}
      </div>
      <div className={styles.description}>
        Так начнется же великая КиберБитва!
      </div>
    </>
  );
}

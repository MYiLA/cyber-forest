import styles from "@pages/page-about/page-about.module.scss";
import { infocards } from "@pages/page-about/constant";
import { DescriptionCard } from "@pages/page-about/entities/description-card/description-card";

export function DescriptionGameTab() {
  return (
    <>
      <div className={styles.description}>
        Киберлес - это захватывающая игра по мотиву серии настольных игр
        <a
          href="https://www.mosigra.ru/Quarriors/rules/"
          style={{
            textDecoration: "underline",
            cursor: "pointer",
            margin: "0 12px",
          }}
          target="_blank"
          rel="noreferrer"
        >
          QUARIORS
        </a>
        , где ваша победа зависит от удачи и умения тактически мыслить. Под
        вашим руководством в бою сойдутся модифицированные звери киберлеса.
      </div>
      <div className={styles.description} style={{ marginTop: "10px" }}>
        Справочник по игре можно найти в основном меню - лобби, доступном после
        регистрации.
      </div>
      <div className={styles.description_cards}>
        {infocards.map((card, index) => (
          <DescriptionCard key={index} {...card} />
        ))}
      </div>
      <div className={styles.description}>
        Так начнется же великая КиберБитва!
      </div>
    </>
  );
}

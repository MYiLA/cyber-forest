import styles from '@pages/page-info/page-info.module.scss'
import { infocards } from '@pages/page-info/constant'
import { DescriptionCard } from '@pages/page-info/entities/description-card/description-card'

export const DescriptionGameTab = () => {
  return (
    <>
      <div className={styles.description}>
        Киберлес - это захватывающая игра по мотиву серии настольных игр
        Quarriors(ссылка на описание настолки), где ваша победа зависит от удачи
        и умения тактически мыслить. Под вашим руководством в бою сойдутся
        модифицированные звери киберлеса.
      </div>
      <div className={styles.description} style={{ marginTop: '10px' }}>
        Гайд по игре можно найти в основном меню - лобби, доступном после
        регистрации.
      </div>
      <div className={styles.description_cards}>
        {infocards.map(card => {
          return <DescriptionCard {...card} />
        })}
      </div>
      <div className={styles.description}>
        Так начнется же великая КиберБитва!
      </div>
    </>
  )
}

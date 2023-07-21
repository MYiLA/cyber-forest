import inventory from '../assets/inventory.png'
import prepareCard from '../assets/prepare-card.png'
import emptyZones from '../assets/empty-zones.png'
import gamers from '../assets/gamers.png'
import styles from './zone.module.scss'
import { CardDescription } from './card-description'
import { DescriptionBlock } from '../description-block'
import { ReactComponent as Arrow } from '../assets/arrow.svg'
import cn from 'classnames'

const warZoneText = `
Воины при призыве в зону битвы атакуют всех противников одновременно на сумму сил своих атак. 
После атаки, воины уходят в глухую оборону до окончания битвы.

При атаке на вас - вы сами выбираете, кто из ваших воинов защищается первый. 

Например вас атакуют на 8 урона. У вас есть кот с защитой 2 и волк с защитой 7. 
Вы хотите спасти волка и выбираете выставить первым на защиту кота. Кот уходит на отдых из-за ранения.

Атака противника уменьшается на величину, равную защите кота: 8-2 = 6  
6 меньше 7, значит волк остаётся в бою.

Битва считается завершенной, когда наступает ваш следующий ход
`

export const Zone = () => {
  return (
    <div className={styles.zone}>
      <Arrow className={cn(styles.arrow, styles.arrow_1)} />
      <Arrow className={cn(styles.arrow, styles.arrow_2)} />
      <Arrow className={cn(styles.arrow, styles.arrow_3)} />
      <Arrow className={cn(styles.arrow, styles.arrow_4)} />
      <Arrow className={cn(styles.arrow, styles.arrow_5)} />
      <Arrow className={cn(styles.arrow, styles.arrow_6)} />
      <Arrow className={cn(styles.arrow, styles.arrow_7)} />
      <div className={styles.top_desc}>
        <div className={styles.top_left}>
          <img
            src={inventory}
            className={styles.inventory_img}
            alt="inventory"
          />
          <img
            src={prepareCard}
            className={styles.prepare_card}
            alt="prepare card"
          />
        </div>
        <div className={styles.top_right}>
          <CardDescription
            title="инвентарь"
            text="Все нанятые вами воины, готовые к битве, находятся в инвентаре. В начале вашего хода вам нужно вслепую выбрать несколько воинов для подготовки к битве."
          />
          <CardDescription
            title="зона подготовки"
            text="Воинов, находящихся в зоне подготовки вы можете отправить на битву, если вам хватает силы на их призыв. Иначе невостребованные воины переходят сразу в зону отдыха."
          />
        </div>
      </div>
      <div className={styles.middle_desc}>
        <div className={styles.middle_desc_top}>
          <DescriptionBlock
            className={cn(styles.min_desc, styles.description_default)}
            text="стоимость призыва"
          />
          <DescriptionBlock
            text="ваша сила"
            className={cn(styles.description_default)}
          />
        </div>
        <DescriptionBlock
          className={cn(styles.description_default, styles.middle_desc_bottom)}
          text="после битвы или при тяжелом ранении воины отправляются в зону отдыха"
        />
      </div>
      <div className={styles.bottom_desc}>
        <div className={styles.bottom_desc_left}>
          <img src={gamers} alt="gamers" />
          <DescriptionBlock
            className={cn(
              styles.description_default,
              styles.middle_desc_bottom
            )}
            text={
              <>
                <h3>ваша сила атаки 2 + 2 + 2 + 2 = 8</h3>
                <h3>вы наносите по 8 урона каждому игроку</h3>
              </>
            }
          />
        </div>
        <CardDescription
          title="зона битвы"
          className={styles.war_zone}
          text={warZoneText}
        />
        <img
          src={emptyZones}
          className={styles.empty_zone_img}
          alt="empty zones"
        />
      </div>
    </div>
  )
}

import { Energy } from '../energy'
import { Glory } from '../glory'
import styles from './card.module.scss'

type CardComponentProps = {
  img: string
  title: string
  energy: number
  glory: number
  onClick: () => void
}

export const CardComponent = ({
  energy,
  glory,
  img,
  title,
  onClick,
}: CardComponentProps) => {
  return (
    <div className={styles.card_wrap} onClick={onClick} onMouseEnter={onClick}>
      <div className={styles.img_wrap}>
        <img className={styles.img} src={img} alt={title} />
      </div>
      <div className={styles.info_top}>
        <span className={styles.title}>{title}</span>
        <span className={styles.count}>5</span>
      </div>
      <div className={styles.info_bottom}>
        <span className={styles.energy_wrap}>
          <Energy className={styles.energy} />
          {energy}
        </span>
        <span className={styles.glory_wrap}>
          <Glory className={styles.glory} />
          {glory}
        </span>
      </div>
    </div>
  )
}

import styles from './card-description.module.scss'
import cn from 'classnames'

type Props = {
  title: string
  text: string
  className?: string
}

export const CardDescription = (props: Props) => {
  const { title, text, className } = props
  return (
    <div className={cn(styles.card, className)}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
    </div>
  )
}

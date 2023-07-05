import cn from 'classnames'
import styles from './descripton-block.module.scss'
import { ReactNode } from 'react'

type Props = {
  className?: string
  text: ReactNode
}

export const DescriptionBlock = ({ className, text }: Props) => {
  const textNode = typeof text === 'string' ? <h3>{text}</h3> : text
  return <div className={cn(styles.description, className)}>{textNode}</div>
}

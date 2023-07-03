import styles from './forest.module.scss'
import { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { BigCard } from '@shared/ui/big-card'
import { DICES_LIB } from '../../constants'
import { DiceType } from '../game/constants'
import { Dice } from '../../type'
import { createForest } from '../../utils/create-forest'
import { CardComponent } from '@shared/ui/card'

export const Forest = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentCard, setCurrentCard] = useState<Dice | undefined>(
    DICES_LIB[DiceType.Cat]
  )
  const [dices, setDices] = useState<Dice[]>()
  const ref = useRef<null | HTMLDivElement>(null)
  const wrapClasses = cn(isOpen ? styles.open : '', styles.forest_wrap)

  useEffect(() => {
    if (!dices) {
      // Генерируем карточки, если их нет ещё на поле игры
      setDices(createForest())
    }
  }, [])

  return (
    <>
      <div className={wrapClasses} ref={ref}>
        <button
          className={styles.forest_switch_btn}
          type="button"
          onClick={() => setIsOpen(!isOpen)}>
          Киберлес
        </button>
        <div className={styles.forest}>
          <ul className={styles.cards_list}>
            <li className={styles.big_card}>
              {currentCard && <BigCard dice={currentCard} />}
            </li>
            {dices?.map(dice => (
              <li key={dice.id} className={styles.card}>
                <CardComponent
                  energy={dice.cost}
                  glory={dice.glory}
                  img={dice.img}
                  title={dice.title}
                  onClick={() => setCurrentCard(dice)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className={styles.invisible_wrap}
        onClick={() => setIsOpen(false)}></div>
    </>
  )
}

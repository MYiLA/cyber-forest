import styles from './forest.module.scss'
import { useEffect, useMemo, useRef, useState } from 'react'
import cn from 'classnames'
import { BigCard } from '@shared/ui/big-card'
import { Dice } from '../../type'
import { createForest } from '../../utils/create-forest'
import { CardComponent } from '@shared/ui/card'
import { RootState } from '@core/store/store'
import { useSelector } from 'react-redux'

type ForestProps = {
  onHire?: (warrior: Dice) => void
}

const getGameState = (store: RootState) => store.game

export const Forest = ({ onHire }: ForestProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentCard, setCurrentCard] = useState<Dice | undefined>()
  const [dices, setDices] = useState<Dice[]>()
  const ref = useRef<null | HTMLDivElement>(null)
  const { accessHireWarriors } = useSelector(getGameState)
  // Получаем число доступных для найма воинов текущей выбранной карточки
  const currentCardLimit = useMemo(() => {
    if (!currentCard) {
      return undefined
    }
    // Находим по типу воина его лимит найма
    const accessHire = accessHireWarriors.find(
      access => access.type === currentCard.type
    )
    return accessHire?.count
  }, [currentCard])

  useEffect(() => {
    // Если карточки в киберлесе есть, а список оступных на покупку воинов очищен
    if (dices?.length && !accessHireWarriors?.length) {
      // То очищаем список карточек
      setDices([])
    }

    // Если карточек в киберлесе нет, а список доступных на покупку воинов сформирован
    if (!dices?.length && accessHireWarriors?.length) {
      // Генерируем карточки
      setDices(createForest(accessHireWarriors))
    }
  }, [dices, accessHireWarriors])

  const wrapClasses = cn(isOpen ? styles.open : '', styles.forest_wrap)

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
              {currentCard && (
                <BigCard
                  dice={currentCard}
                  onHire={onHire}
                  limit={currentCardLimit}
                />
              )}
            </li>
            {dices?.map(dice => (
              <li key={dice.id} className={styles.card}>
                <CardComponent
                  energy={dice.cost}
                  glory={dice.glory}
                  img={dice.img}
                  title={dice.title}
                  type={dice.type}
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

/* eslint-disable @typescript-eslint/no-unused-vars */
import styles from './page-game.module.scss'
import { Game } from './widgets/game'
import { Forest } from './widgets/forest'
import { GameInterface } from './widgets/game-interface'
import {
  AreaType,
  DEFAULT_SETTING,
  PhaseType,
  PlayerType,
} from './widgets/game/constants'
import { DiceSide, GameState } from './widgets/game/type'
import { getInitialGameState } from './widgets/game/utils/get-initial-game-state'
import { useEffect, useState } from 'react'
import { Dice, Player } from './type'

export const PageGame = () => {
  const [gameState, setGameState] = useState<GameState>(getInitialGameState({}))
  const [currentPlayer, setCurrentPlayer] = useState<Player>(
    gameState[PlayerType.Red]
  )
  const [currentPhase, setCurrentPhase] = useState(PhaseType.Stock)
  const [stockCubeCount, setStockCubeCount] = useState(
    DEFAULT_SETTING.START_CUBE_LIMIT
  )

  // Обработка фазы Инвентаря
  useEffect(() => {
    if (currentPhase !== PhaseType.Stock) return
    // Обновляем лимит доставаемых кубиков из инвентаря
    setStockCubeCount(2)

    return () => {
      // setOnChoosingCube(undefined);
    }
  }, [currentPhase])

  // Обработка фазы Подготовки
  useEffect(() => {
    if (currentPhase !== PhaseType.PreparationAndHiring) return
  }, [currentPhase])

  // Обработка фазы Атаки
  useEffect(() => {
    if (currentPhase !== PhaseType.Attack) return
  }, [currentPhase])

  // Обработка фазы Защиты
  useEffect(() => {
    if (currentPhase !== PhaseType.Defense) return
  }, [currentPhase])

  const onChoosingCube = (side: DiceSide, id: string) => {
    if (currentPhase !== PhaseType.Stock || stockCubeCount === 0) return

    const oldAreaPreparation =
      gameState?.[currentPlayer.type]?.[AreaType.Preparation]
    const oldPlayer = gameState[currentPlayer.type]

    if (!oldAreaPreparation || !oldPlayer) return

    const dice = {
      ...currentPlayer.stock.find(dice => dice.id === id),
      activeSide: side,
    } as Dice
    const stock = currentPlayer.stock.filter(dice => dice.id !== id) as Dice[]
    const player = {
      ...oldPlayer,
      stock,
      [AreaType.Preparation]: [...oldAreaPreparation, dice],
    }

    setGameState({ ...gameState, [currentPlayer.type]: player })
    setCurrentPlayer(player)
    setStockCubeCount(stockCubeCount - 1)
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.game}>
        <Game gameState={gameState} />
        <GameInterface
          players={Object.values(gameState)}
          currentPlayer={currentPlayer}
          onChoosingCube={onChoosingCube}
        />
        <Forest />
      </div>
    </div>
  )
}

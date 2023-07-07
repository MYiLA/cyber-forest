import styles from './game.module.scss'
import { FC, MouseEventHandler, Ref, useEffect, useMemo, useRef } from 'react'
import { AreaType, PlayerType, SIZE } from './constants'
import {
  drawUsersAreas,
  drawDicesSides,
  getCursorPosition,
  getPlayerByPoint,
  getAreaByPoint,
  drawUserEnergy,
} from './utils'
import { GameState } from './type'
import { Dice } from '../../type'
import { getDiceByPoint } from './utils/get-dice-by-point'
import { RootState } from '@core/store/store'
import { useSelector } from 'react-redux'

type GameProps = {
  gameState: GameState
  onChoosingCube?: ({
    area,
    playerType,
    dice,
  }: {
    playerType: PlayerType
    area: AreaType
    dice: Dice
  }) => void
}

const getGameState = (store: RootState) => store.game

export const Game: FC<GameProps> = ({
  gameState,
  onChoosingCube,
}: GameProps) => {
  const { currentPlayerEnergy, currentPlayerType } = useSelector(getGameState)
  const ref: Ref<HTMLCanvasElement> = useRef(null)
  const players = useMemo(() => Object.keys(gameState) as PlayerType[], [])
  const playersCount = useMemo(() => players.length, [])
  const canvas = ref.current

  useEffect(() => {
    if (canvas === null) return
    const ctx = canvas.getContext('2d')
    if (ctx === null) {
      throw new Error('PlayAreas: ctx === null')
    }
    // Очистка холста перед отрисовкой
    ctx.clearRect(0, 0, SIZE.GAME.WIDTH, SIZE.GAME.HEIGHT)

    // Отрисовка полей для игроков (1 слой)
    drawUsersAreas(ctx, playersCount)

    // Отрисовка энергии текущего игрока (2 слой)
    drawUserEnergy({
      ctx,
      energy: currentPlayerEnergy,
      player: currentPlayerType,
    })

    // Отрисовка кубиков для каждой зоны каждого игрока (3 слой)
    players.forEach(playerType => {
      ;[AreaType.Rest, AreaType.Preparation, AreaType.Attack].forEach(
        areaType => {
          const dices = gameState?.[playerType]?.[areaType]
          if (!dices)
            throw new Error(
              'Game: gameState?.[playerType]?.[areaType] is undefined'
            )

          const sides = dices.map(dice => {
            const { activeSide } = dice
            if (!activeSide)
              throw new Error(
                'Game: На отрисовку отдан кубик БЕЗ активной стороны'
              )
            return activeSide
          })

          drawDicesSides({
            ctx,
            sides,
            area: areaType,
            player: playerType,
          })
        }
      )
    })
  }, [gameState, canvas, currentPlayerEnergy])

  const onChoosingCubeHandler: MouseEventHandler<HTMLCanvasElement> = (
    ev
  ): void => {
    // Если канвас не отрисован, или нет внешнего обработчика то слушатель не нужен
    if (canvas === null || !onChoosingCube) return
    // Получаем координаты клика
    const { x, y } = getCursorPosition(canvas, ev)
    // По координатам клика вычисляем тип игрока
    const playerType: PlayerType | null = getPlayerByPoint(x, y)

    // Если клик был не по зоне игрока, то обработчик не нужен
    if (!playerType) return

    // По координатам клика вычисляем тип зоны
    const area: AreaType | null = getAreaByPoint({ playerType, x, y })

    // Если клик был не по зоне игрока, то обработчик не нужен
    if (!area) return

    const dices = gameState?.[playerType]?.[area]

    // Если в зоне нет кубиков, то обработчик не нужен
    if (!dices?.length) return

    // Вычисляем, нажатый кубик
    const dice: Dice | undefined = getDiceByPoint({
      playerType,
      x,
      y,
      area,
      dices,
    })

    // Если ни один кубик не был нажат, то обработчик не нужен
    if (!dice) return

    // Если все данные есть, то запускаем обработчик
    if (playerType && area && dice) {
      onChoosingCube({
        playerType,
        area,
        dice,
      })
    }
  }

  return (
    <div className={styles.play_area_wrap}>
      <canvas
        ref={ref}
        className={styles.play_area}
        width={SIZE.GAME.WIDTH}
        height={SIZE.GAME.HEIGHT}
        onClick={onChoosingCubeHandler}
      />
    </div>
  )
}

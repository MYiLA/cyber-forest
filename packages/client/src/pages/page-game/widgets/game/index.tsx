import styles from './game.module.scss'
import { FC, Ref, useEffect, useMemo, useRef } from 'react'
import { AreaType, PlayerType, SIZE } from './constants'
import { drawUsersAreas } from './utils/draw-users-areas'
import { drawDicesSides } from './utils/draw-dices-sides'
import { GameState } from './type'

type GameProps = {
  gameState: GameState
}

export const Game: FC<GameProps> = ({ gameState }: GameProps) => {
  const ref: Ref<HTMLCanvasElement> = useRef(null)
  const players = useMemo(() => Object.keys(gameState) as PlayerType[], [])
  const playersCount = useMemo(() => players.length, [])

  useEffect(() => {
    if (ref.current === null) throw new Error('PlayAreas: ref.current === null')
    const ctx = ref.current.getContext('2d')
    if (ctx === null) throw new Error('PlayAreas: ctx === null')
    // Очистка холста перед отрисовкой
    ctx.clearRect(0, 0, SIZE.GAME.WIDTH, SIZE.GAME.HEIGHT)

    // Отрисовка полей для игроков (1 слой)
    drawUsersAreas(ctx, playersCount)

    // Отрисовка кубиков для каждой зоны каждого игрока (2 слой)
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
  }, [gameState])

  return (
    <div className={styles.play_area_wrap}>
      <canvas
        ref={ref}
        className={styles.play_area}
        width={SIZE.GAME.WIDTH}
        height={SIZE.GAME.HEIGHT}
      />
    </div>
  )
}

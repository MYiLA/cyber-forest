import styles from './game-interface.module.scss'

import { Player } from '../../type'
import { GloryCounter } from '../../entities/glory-counter'
import { Chronicle } from '../../entities/chronicle'
import { TimeCounter } from '../../entities/time-counter'
import { Stock } from '../../features/stock'
import { Control } from '../../features/control'
import { Chat } from '../../features/chat'
import { DiceSide } from '../game/type'

type GameInterfaceProp = {
  players: Player[]
  currentPlayer: Player
  onChoosingCube?: (side: DiceSide, id: string) => void
}

export const GameInterface: React.FC<GameInterfaceProp> = ({
  players = [],
  currentPlayer,
  onChoosingCube,
}) => {
  return (
    <div className={styles.interface}>
      <div className={styles.info}>
        <div className={styles.progress}>
          <ul className={styles.glories}>
            {players.map(player => (
              <li key={`${player.type}-${player?.id}`} className={styles.glory}>
                <GloryCounter
                  gloryCount={player.gloryCount}
                  playerType={player.type}
                />
              </li>
            ))}
          </ul>
          <TimeCounter />
        </div>
        <Chronicle players={players} />
      </div>

      <div className={styles.interactive_wrap}>
        <div className={styles.stock_wrap}>
          <Stock
            dices={currentPlayer.stock}
            onChoosingCubeProp={onChoosingCube}
          />
          <Control />
        </div>
        <Chat />
      </div>
    </div>
  )
}

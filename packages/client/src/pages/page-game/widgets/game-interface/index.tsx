import styles from "./game-interface.module.scss";

import { Player } from "../../type";
import { GloryCounter } from "../../entities/glory-counter";
import { Chronicle } from "../../entities/chronicle";
import { TimeCounter } from "../../entities/time-counter";
import { Stock } from "../../features/stock";
import { Control } from "../../features/control";
import { Chat } from "../../features/chat";
import { DiceSide } from "../game/type";
import { AreaType } from "../game/constants";

type GameInterfaceProp = {
  players: (Player | null)[];
  currentPlayer: Player;
  onChoosingCube?: (side: DiceSide, id: string) => void;
  onDone?: () => void;
};

export function GameInterface({
  players = [],
  currentPlayer,
  onChoosingCube,
  onDone,
}: GameInterfaceProp) {
  return (
    <div className={styles.interface}>
      <div className={styles.info}>
        <div className={styles.progress}>
          <ul className={styles.glories}>
            {players.map(
              (player) =>
                player && (
                  <li
                    key={`${player.type}-${player?.id}`}
                    className={styles.glory}
                  >
                    <GloryCounter
                      gloryCount={player.gloryCount}
                      playerType={player.type}
                    />
                  </li>
                )
            )}
          </ul>
          <TimeCounter />
        </div>
        <Chronicle />
      </div>

      <div className={styles.interactive_wrap}>
        <div className={styles.stock_wrap}>
          <Stock
            dices={currentPlayer[AreaType.Stock]}
            onChoosingCubeProp={onChoosingCube}
          />
          <Control onDone={onDone} />
        </div>
        <Chat />
      </div>
    </div>
  );
}

import cn from "classnames";

import { useTheme } from "@hooks/use-theme";
import { Theme } from "@config/constants";
import { Player } from "../../type";
import { GloryCounter } from "../../entities/glory-counter";
import { Chronicle } from "../../entities/chronicle";
import { TimeCounter } from "../../entities/time-counter";
import { Stock } from "../../features/stock";
import { Control } from "../../features/control";
import { Chat } from "../../features/chat";
import { DiceSide } from "../game/type";
import { AreaType, GameType } from "../game/constants";

import styles from "./game-interface.module.scss";

type GameInterfaceProp = {
  players: (Player | null)[];
  currentPlayer: Player;
  gameType: GameType;
  onChoosingCube?: (side: DiceSide, id: string) => void;
  onDone?: () => void;
};

export function GameInterface({
  players = [],
  currentPlayer,
  onChoosingCube,
  onDone,
  gameType,
}: GameInterfaceProp) {
  const themeName = useTheme();

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
          {gameType === GameType.Online && <TimeCounter />}
        </div>
        <Chronicle />
      </div>

      <div className={styles.interactive_wrap}>
        <div
          className={cn(styles.stock_wrap, {
            [styles.offline]: gameType === GameType.Offline,
            [styles.puple]: themeName === Theme.Purple,
            [styles.neon]: themeName === Theme.Neon,
          })}
        >
          <Stock
            dices={currentPlayer[AreaType.Stock]}
            onChoosingCubeProp={onChoosingCube}
            gameType={gameType}
          />
          <Control onDone={onDone} />
        </div>
        {gameType === GameType.Online && <Chat />}
      </div>
    </div>
  );
}

import { GloryCounter } from "@pages/page-game/entities/glory-counter";
import { ChronicleMessage } from "@/shared/type";
import styles from "./message.module.scss";

type MessageProps = {
  message: ChronicleMessage;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Message({ message: messageProp }: MessageProps) {
  const { player, message } = messageProp;
  return (
    <>
      <div className={styles.glory_wrap}>
        {player && (
          <GloryCounter
            key={`${player.type}`}
            gloryCount={player.gloryCount}
            playerType={player.type}
          />
        )}
      </div>
      <p className={styles.desc}>{message}</p>
    </>
  );
}

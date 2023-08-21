import { MutableRefObject, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@hooks/use-theme";
import { Theme } from "@config/constants";
import styles from "./chronicle.module.scss";
import { Message } from "./components/message";

const getGameState = (store: RootState) => store.game;

export function Chronicle() {
  const themeName = useTheme();

  const { chronicleMessages } = useSelector(getGameState);
  const endElement = useRef() as MutableRefObject<HTMLLIElement>;

  useEffect(() => {
    if (!endElement.current) return;
    if (typeof endElement.current.scrollIntoView === "function") {
      endElement.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [endElement, chronicleMessages]);

  return (
    <div
      className={`${styles.chronicle} ${
        themeName === Theme.Purple ? styles.purple : styles.neon
      }`}
    >
      <ul className={styles.messages_list}>
        {chronicleMessages?.length && (
          <>
            {chronicleMessages.map((message) => (
              <li key={message.id} className={styles.message_wrap}>
                <Message message={message} />
              </li>
            ))}
            <li
              ref={endElement}
              style={{
                height: "1px",
                width: "1px",
              }}
            />
          </>
        )}
      </ul>
      <span className={styles.title}>Хроника</span>
    </div>
  );
}

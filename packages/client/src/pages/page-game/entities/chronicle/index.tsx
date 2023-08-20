import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./chronicle.module.scss";
import { Message } from "./components/message";

const getGameState = (store: RootState) => store.game;

export function Chronicle() {
  const { chronicleMessages } = useSelector(getGameState);
  const [endElement, setEndElement] = useState<HTMLLIElement | null>(null);
  const ref = useRef(null);

  useEffect(() => {
    if (endElement === null) return;

    endElement.scrollIntoView({ behavior: "smooth" });
  }, [ref, chronicleMessages]);

  return (
    <div className={styles.chronicle}>
      <ul className={styles.messages_list}>
        {chronicleMessages?.length && (
          <>
            {chronicleMessages.map((message) => (
              <li key={message.id} className={styles.message_wrap}>
                <Message message={message} />
              </li>
            ))}
            <li
              ref={(el) => setEndElement(el)}
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

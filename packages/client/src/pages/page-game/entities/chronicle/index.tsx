import styles from "./chronicle.module.scss";
import { Message } from "./components/message";
import { MESSAGES } from "./mock";

export function Chronicle() {
  return (
    <div className={styles.chronicle}>
      <ul className={styles.messages_list}>
        {MESSAGES.map((message) => (
          <li key={message.id} className={styles.message_wrap}>
            <Message message={message} />
          </li>
        ))}
      </ul>
      <span className={styles.title}>Хроника</span>
    </div>
  );
}

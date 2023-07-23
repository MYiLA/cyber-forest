import { MainButton } from "@shared/ui/main-button/main-button";
import { MainInput } from "@shared/ui/main-input/main-input";
import { ChatMessageEntity } from "../../entities/chat-message";
import styles from "./chat.module.scss";
import { MESSAGES } from "./mock";

export const Chat = () => (
  <div className={styles.chat}>
    <ul className={styles.messages_list}>
      {MESSAGES.map((message) => (
        <li key={message.id}>
          <ChatMessageEntity message={message} />
        </li>
      ))}
    </ul>
    <div className={styles.form_wrap}>
      <span className={styles.title}>Чат</span>
      <form className={styles.form}>
        <MainInput
          name="message"
          type="text"
          placeholder="Введите сообщение, чтобы начать общение в чате"
          className={styles.input}
          align="none"
        />
        <MainButton type="button" className={styles.btn_smile} />
        <MainButton type="button" className={styles.btn_send} />
      </form>
    </div>
  </div>
);

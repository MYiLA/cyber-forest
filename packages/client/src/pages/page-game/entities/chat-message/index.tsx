import { ChatMessage } from '../../features/chat/type'
import styles from './chat-message-entity.module.scss'

type ChatMessageEntityProps = {
  message: ChatMessage
}

export const ChatMessageEntity: React.FC<ChatMessageEntityProps> = ({
  message,
}) => {
  return (
    <div className={styles.message_wrap}>
      <div className={styles.avatar}>
        <img src={message.avatar} alt={message.userName} />
      </div>
      <div className={styles.message}>
        <div className={styles.user_name}>
          {message.userName}
          <span className={styles.time}>{message.time}</span>
        </div>
        <p className={styles.text}>{message.text}</p>
      </div>
    </div>
  )
}

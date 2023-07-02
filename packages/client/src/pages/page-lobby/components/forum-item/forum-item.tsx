import { User } from '../../../../core/config/user-types'
import { Theme } from '../../../../core/config/constants'
import emptyChat from '../../../../assets/images/chat-avatar.png'
import styles from './forum-item.module.scss'
import { useTheme } from '@hooks/use-theme'
import { dateFormatter } from '@utils/date-formatter'

export interface IChatData {
  id: number
  title: string
  avatar: string | null
  unread_count: number
  last_message: ILastMessage | undefined
  onClick?: (id: number) => void
}

export interface ILastMessage {
  user: User
  time: string
  content: string
}

export const ForumItem: React.FC<IChatData> = ({
  id,
  title,
  last_message,
  onClick,
}) => {
  const { themeName } = useTheme()

  return (
    <div
      className={`${styles.forum_wrapper} ${
        themeName === Theme.Purple ? styles.purpur : styles.neon
      }`}
      // style={{height: last_message? last_message.content.length * 3 : 50}}
    >
      <div className={styles.forum_header}>
        <h3 className={styles.title}>{title}</h3>
        {last_message ? (
          <span className={styles.date}>
            {dateFormatter(last_message.time)}
          </span>
        ) : null}
      </div>
      {last_message ? (
        <div className={styles.forum_body}>
          <img
            src={
              last_message.user.avatar
                ? 'https://ya-praktikum.tech/api/v2/resources' +
                  last_message.user.avatar
                : emptyChat
            }
            alt={'аватар пользователя'}
            className={styles.image}
          />
          <span className={styles.message}>{last_message.content}</span>
        </div>
      ) : (
        <div className={styles.forum_body}>
          <span className={styles.message}>
            {' '}
            в этой теме еще нет сообщений{' '}
          </span>
        </div>
      )}
      <button
        className={styles.forum_open}
        onClick={() => {
          onClick ? onClick(id) : null
        }}>
        Просмотр темы
      </button>
    </div>
  )
}

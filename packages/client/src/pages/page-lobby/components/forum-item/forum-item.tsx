import { Theme } from '@config/constants'
import emptyChat from '@images/chat-avatar.png'
import styles from './forum-item.module.scss'
import { useTheme } from '@hooks/use-theme'
import { dateFormatter } from '@utils/date-formatter'
import { IChatData } from '@pages/page-lobby/types'
import cn from 'classnames'

export const ForumItem: React.FC<IChatData> = ({
  id,
  title,
  last_message,
  onClick,
}) => {
  const { themeName } = useTheme()
  const userAvatar = last_message?.user.avatar
    ? 'https://ya-praktikum.tech/api/v2/resources' + last_message.user.avatar
    : emptyChat

  const handleBtnClick = () => {
    onClick ? onClick(id) : null
  }

  return (
    <div
      className={cn(styles.forum_wrapper, {
        [styles.purpur]: themeName === Theme.Purple,
        [styles.neon]: themeName !== Theme.Purple,
      })}>
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
            src={userAvatar}
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
      <button className={styles.forum_open} onClick={handleBtnClick}>
        Просмотр темы
      </button>
    </div>
  )
}

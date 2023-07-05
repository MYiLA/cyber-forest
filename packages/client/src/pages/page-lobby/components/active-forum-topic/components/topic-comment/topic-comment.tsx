import { ITopicComment } from '@pages/page-lobby/types'
import styles from './topic-comment.module.scss'
import { BaseSyntheticEvent, useState } from 'react'
import user_mock from '@images/chat-avatar.png'
import { dateFormatter } from '@utils/date-formatter'
import likeUnactiveNeon from '@images/like-unactive-neon.svg'
import likePurple from '@images/like.svg'
import likeUnactivePurple from '@images/like-unactive-purple.svg'
import likeNeon from '@images/like-neon.svg'
import { Theme } from '@config/constants'
import { useTheme } from '@hooks/use-theme'
import { TopicSubcomment } from '@pages/page-lobby/components/active-forum-topic/components/topic-subcomment/topic-subcomment'
import { ITopicCommentComment } from '@pages/page-lobby/types'
import classNames from 'classnames'

export const TopicComment: React.FC<ITopicComment> = ({
  comment_id,
  time,
  user_data,
  content,
  likes,
  liked,
  comments,
}) => {
  const [comment, setComment] = useState<string | undefined>(undefined)
  const { themeName } = useTheme()

  const getIcon = () => {
    if (themeName === Theme.Purple) {
      if (liked) {
        return likePurple
      } else {
        return likeUnactivePurple
      }
    } else {
      if (liked) {
        return likeNeon
      } else {
        return likeUnactiveNeon
      }
    }
  }

  const getInputClasses = () => {
    const input = document.querySelectorAll(`input.${styles.comment_response}`)[
      comment_id
    ]
    if (comment) {
      console.log('comment added')
      input?.classList.remove(styles.active)
    } else {
      input?.classList.add(styles.active)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div key={comment_id} className={styles.comment_wrapper}>
        <img
          src={user_data?.avatar || user_mock}
          className={styles.comment_avatar}
          alt={'аватар пользователя'}
        />
        <div className={styles.comment_body}>
          <div className={styles.comment_header}>
            <h3 className={styles.name}>{user_data?.display_name}</h3>
            <span className={styles.time}>{dateFormatter(time)}</span>
          </div>
          <span>{content}</span>
          <div className={styles.flex_row}>
            <div>
              <button
                type={'button'}
                onClick={() => {
                  console.log('like added')
                }}
                className={styles.comment_like_btn}>
                <img
                  src={getIcon()}
                  alt={'иконка "лайк"'}
                  className={styles.comment_like}
                />
                <span>{likes}</span>
              </button>
            </div>
            <input
              className={classNames(
                styles.comment_response,
                themeName === Theme.Purple
                  ? styles.comment_response_purple
                  : styles.comment_response_neon
              )}
              placeholder={'введите сообщение'}
              name={comment_id.toString()}
              onBlur={(event: BaseSyntheticEvent) => {
                setComment(event.target.value)
              }}
            />
            <button
              className={classNames(
                styles.comment_send,
                themeName === Theme.Purple
                  ? styles.comment_send_purple
                  : styles.comment_send_neon
              )}
              onClick={getInputClasses}>
              ответить
            </button>
          </div>
        </div>
      </div>
      {comments && comments[0] && (
        <div className={styles.comment_comments}>
          {comments.map((comm: ITopicCommentComment) => (
            <TopicSubcomment {...comm} />
          ))}
        </div>
      )}
    </div>
  )
}

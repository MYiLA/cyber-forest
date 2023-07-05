import React from 'react'
import { ITopicCommentComment } from '@pages/page-lobby/types'
import styles from './topic-subcomment.module.scss'
import avatar from '../../../../../../assets/images/chat-avatar.png'
import { dateFormatter } from '@utils/date-formatter'

export const TopicSubcomment: React.FC<ITopicCommentComment> = ({
  user,
  time,
  content,
}) => {
  const UserAvatar = user?.avatar
    ? 'https://ya-praktikum.tech/api/v2/resources' + user.avatar
    : avatar

  return (
    <div className={styles.subcomment_wrapper}>
      <img
        src={UserAvatar}
        className={styles.subcomment_avatar}
        alt={'аватар пользователя'}
      />
      <div className={styles.subcomment_body}>
        <div className={styles.subcomment_header}>
          <span className={styles.name}>{user.display_name}</span>
          <span className={styles.time}>{dateFormatter(time)}</span>
        </div>
        <span>{content}</span>
      </div>
    </div>
  )
}

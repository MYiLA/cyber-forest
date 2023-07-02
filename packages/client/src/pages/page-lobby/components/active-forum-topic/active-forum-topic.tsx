import styles from './active-forum-topic.module.scss'
import React from 'react'
import { useTheme } from '@hooks/use-theme'
import { Theme } from '@config/constants'
import { TopicComment } from '@pages/page-lobby/components/active-forum-topic/components/topic-comment/topic-comment'
import {
  IActiveForumTopicProps,
  ITopicComment,
  ITopicDetails,
} from '@pages/page-lobby/types'
import close from '../../../../assets/images/close.svg'

const topicData: ITopicDetails = {
  title: 'кому Вообще нужны эти правила?',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ' +
    'tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, ' +
    'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ' +
    'aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ' +
    'tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, ' +
    'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ' +
    'aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
    'eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  commentaries: [
    {
      comment_id: 1,
      time: '11/ 06/2023, 12:30',
      type: 'message',
      user_data: {
        id: 1,
        first_name: 'asd',
        second_name: 'asd',
        display_name: 'abracadabra',
        login: 'abracadabra',
        email: 'my@email.com',
        phone: '89223332211',
        avatar: '',
      },
      content: 'abjsdljA alsjdhlas ahsjdl',
      likes: 0,
      liked: false,
      comments: [
        {
          time: '11/ 06/2023, 12:30',
          type: 'message',
          user: {
            first_name: 'asd',
            second_name: 'asd',
            display_name: 'abracadabra',
            login: 'abracadabra',
            email: 'my@email.com',
            phone: '89223332211',
            avatar: '',
          },
          content: 'abjsdljA alsjdhlas ahsjdl',
        },
        {
          time: '11/ 06/2023, 12:30',
          type: 'message',
          user: {
            first_name: 'asd',
            second_name: 'asd',
            display_name: 'abracadabra',
            login: 'abracadabra',
            email: 'my@email.com',
            phone: '89223332211',
            avatar: '',
          },
          content: 'abjsdljA alsjdhlas ahsjdl',
        },
      ],
    },
    {
      comment_id: 2,
      time: '11/ 06/2023, 12:30',
      type: 'message',
      user_data: {
        id: 123,
        first_name: 'Petya',
        second_name: 'Pupkin',
        display_name: 'Petya Pupkin',
        login: 'userLogin',
        email: 'my@email.com',
        phone: '89223332211',
        avatar: '/path/to/avatar.jpg',
      },
      content: 'abjsdljA alsjdhlas ahsjdl',
      likes: 3,
      liked: true,
    },
  ],
}

export const ActiveTopicModal: React.FC<IActiveForumTopicProps> = ({
  onClose,
}) => {
  const { themeName } = useTheme()

  return (
    <div
      className={`${styles.layout} ${
        themeName === Theme.Purple ? styles.purple : styles.neon
      }`}>
      <div
        className={`${styles.modal_wrapper} ${
          themeName === Theme.Purple
            ? styles.modal_wrapper_purple
            : styles.modal_wrapper_neon
        }`}>
        <button className={styles.modal_close} onClick={onClose}>
          <img src={close} alt={'иконка закрытия'} />
        </button>
        <h3 className={styles.modal_header}>{topicData.title}</h3>
        <div
          className={`${styles.topic} ${
            themeName === Theme.Purple ? styles.topic_purple : styles.topic_neon
          }`}>
          <span className={styles.topic_descr}>{topicData.description}</span>
          {topicData.commentaries && topicData.commentaries.length > 0 ? (
            topicData.commentaries.map(
              (comment: ITopicComment, index: number) => {
                return <TopicComment {...comment} comment_id={index} />
              }
            )
          ) : (
            <span className={styles.topic_empty}>
              в этой теме еще нет комментариев.
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

import styles from './page-lobby.module.scss'
import { useSelector } from 'react-redux'
import { TableItem } from './components/table-item/table-item'
import React, { BaseSyntheticEvent, useEffect, useState } from 'react'
import { ForumItem, IChatData } from './components/forum-item/forum-item'
import avatar from '../../assets/images/chat-avatar.png'
import { RootState } from '@store/store'
import { useTheme } from '@hooks/use-theme'
import { Theme } from '@config/constants'
import settings from '@images/settings.svg'
import { Rating } from '@pages/page-lobby/components/rating/rating'
import { BattleSetting } from '@pages/page-lobby/components/battle-settings/battle-settings'
import { ActiveTopicModal } from '@pages/page-lobby/components/active-forum-topic/active-forum-topic'

const tables_mock = [
  {
    id: 832,
    title: 'string',
    users: [
      {
        id: 111,
        first_name: 'string',
        second_name: 'string',
        display_name: 'string',
        login: 'string',
        email: 'string',
        phone: 'string',
        avatar: '',
      },
    ],
    // password: 111
  },
]
const forum_mock_topics: IChatData[] | [] = [
  {
    id: 123,
    title: 'my-chat',
    avatar: null,
    unread_count: 15,
    last_message: {
      user: {
        first_name: 'Petya',
        second_name: 'Pupkin',
        avatar: '',
        email: 'my@email.com',
        login: 'userLogin',
        phone: '8(911)-222-33-22',
      },
      time: '2020-01-02T14:22:22.000Z',
      content: 'this is message content',
    },
  },
]

export const PageLobby = () => {
  const { user } = useSelector((store: RootState) => store)
  const { themeName } = useTheme()
  const [searchString, setSearchString] = useState<string>('')
  const [newTopic, setNewTopic] = useState<string | null>(null)
  const [topicList, setTopicList] = useState(forum_mock_topics)
  const [activeTopicId, setActiveTopicId] = useState(0)

  useEffect(() => {
    OnSearchInput(searchString, topicList)
  }, [searchString])

  function OnSearchInput(value: string, array: IChatData[]) {
    if (Array.isArray(array) && array[0] && value) {
      const res = array.filter(chat => chat.title.includes(value))
      setTopicList(res)
    } else if (!value) {
      setTopicList(forum_mock_topics)
    }
  }

  return (
    <div className={styles.container}>
      <section
        className={`${styles.window} ${
          themeName === Theme.Purple ? styles.purpur : styles.neon
        }`}>
        <h3 className={styles.window_header}>доступные битвы</h3>
        <div className={styles.window_wrapper}>
          {tables_mock.map(table => {
            return <TableItem {...table} />
          })}
        </div>
      </section>
      <section
        className={`${styles.forum} ${
          themeName === Theme.Purple ? styles.purpur : styles.neon
        }`}>
        <input
          type={'search'}
          onChange={(event: BaseSyntheticEvent) =>
            setSearchString(event.target.value)
          }
          placeholder={'Поиск по названию'}
          className={`${styles.forum_search} ${
            themeName === Theme.Purple ? styles.purpur : styles.neon
          }`}
        />
        {topicList.map(topic => {
          return <ForumItem {...topic} onClick={setActiveTopicId} />
        })}
        <div className={styles.forum_input_wrapper}>
          <input
            className={`${styles.forum_input} ${
              themeName === Theme.Purple ? styles.purpur : styles.neon
            }`}
            onBlur={(event: BaseSyntheticEvent) => {
              console.log('new topic name', event.target.value)
              setNewTopic(event.target.value)
            }}
            placeholder={'Введите тему для обсуждения'}
          />
          <button
            type={'submit'}
            disabled={!newTopic}
            onClick={() => {
              console.log('topic added')
            }}
            className={`${styles.forum_input_submit} ${
              themeName === Theme.Purple
                ? styles.forum_input_submit_purpur
                : styles.forum_input_submit_neon
            }`}>
            Создать тему
          </button>
        </div>
      </section>
      <section
        className={`${styles.user} ${
          themeName === Theme.Purple ? styles.user_purpur : styles.user_neon
        }`}>
        <img
          src={
            user.user?.avatar
              ? 'https://ya-praktikum.tech/api/v2/resources' + user.user?.avatar
              : avatar
          }
          alt={'аватар пользователя'}
          className={styles.user_avatar}
        />
        <div className={styles.user_row}>
          <span className={styles.user_name}>
            {user.user?.first_name} {user.user?.second_name}
          </span>
          <a className={styles.user_settings}>
            <img src={settings} alt={'настройки'} />
          </a>
        </div>
        <a
          className={`${styles.user_link} ${
            themeName === Theme.Purple ? styles.purpur : styles.neon
          }`}>
          как играть?
        </a>
        <a
          className={`${styles.user_link} ${
            themeName === Theme.Purple ? styles.purpur : styles.neon
          }`}>
          бестиарий
        </a>
        <Rating />
        <BattleSetting />
        {activeTopicId ? (
          <ActiveTopicModal
            id={activeTopicId}
            onClose={() => {
              setActiveTopicId(0)
            }}
          />
        ) : null}
      </section>
    </div>
  )
}

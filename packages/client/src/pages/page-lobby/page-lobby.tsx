import styles from './page-lobby.module.scss'
import { useSelector } from 'react-redux'
import { TableItem } from './components/table-item/table-item'
import React, { BaseSyntheticEvent, useEffect, useState } from 'react'
import { ForumItem } from './components/forum-item/forum-item'
import avatar from '@images/chat-avatar.png'
import { RootState } from '@store/store'
import { useTheme } from '@hooks/use-theme'
import { Theme } from '@config/constants'
import settings from '@images/settings.svg'
import { Rating } from '@pages/page-lobby/components/rating/rating'
import { BattleSetting } from '@pages/page-lobby/components/battle-settings/battle-settings'
import { ActiveTopicModal } from '@pages/page-lobby/components/active-forum-topic/active-forum-topic'
import { forum_mock_topics, tables_mock } from '@pages/page-lobby/mocks'
import classNames from 'classnames'
import { IChatData } from '@pages/page-lobby/types'

export const PageLobby = () => {
  const { user } = useSelector((store: RootState) => store)
  const { themeName } = useTheme()
  const [searchString, setSearchString] = useState<string>('')
  const [newTopic, setNewTopic] = useState<string | null>(null)
  const [topicList, setTopicList] = useState(forum_mock_topics)
  const [activeTopicId, setActiveTopicId] = useState(0)

  useEffect(() => {
    onSearchInput(searchString, topicList)
  }, [searchString])

  function onSearchInput(value: string, array: IChatData[]) {
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
        className={classNames(
          styles.window,
          themeName === Theme.Purple ? styles.purpur : styles.neon
        )}>
        <h3 className={styles.window_header}>доступные битвы</h3>
        <div className={styles.window_wrapper}>
          {tables_mock.map(table => {
            return <TableItem {...table} />
          })}
        </div>
      </section>
      <section
        className={classNames(
          styles.forum,
          themeName === Theme.Purple ? styles.purpur : styles.neon
        )}>
        <input
          type={'search'}
          onChange={(event: BaseSyntheticEvent) =>
            setSearchString(event.target.value)
          }
          placeholder={'Поиск по названию'}
          className={classNames(
            styles.forum_search,
            themeName === Theme.Purple ? styles.purpur : styles.neon
          )}
        />
        {topicList.map(topic => {
          return <ForumItem {...topic} onClick={setActiveTopicId} />
        })}
        <div className={styles.forum_input_wrapper}>
          <input
            className={classNames(
              styles.forum_input,
              themeName === Theme.Purple ? styles.purpur : styles.neon
            )}
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
            className={classNames(
              styles.forum_input_submit,
              themeName === Theme.Purple
                ? styles.forum_input_submit_purpur
                : styles.forum_input_submit_neon
            )}>
            Создать тему
          </button>
        </div>
      </section>
      <section
        className={classNames(
          styles.user,
          themeName === Theme.Purple ? styles.user_purpur : styles.user_neon
        )}>
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
          className={classNames(
            styles.user_link,
            themeName === Theme.Purple ? styles.purpur : styles.neon
          )}>
          как играть?
        </a>
        <a
          className={classNames(
            styles.user_link,
            themeName === Theme.Purple ? styles.purpur : styles.neon
          )}>
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

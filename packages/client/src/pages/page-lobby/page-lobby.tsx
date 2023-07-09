import styles from './page-lobby.module.scss'
import { useSelector } from 'react-redux'
import { TableItem } from './components/table-item/table-item'
import React, { BaseSyntheticEvent, useEffect, useState } from 'react'
import { ForumItem } from './components/forum-item/forum-item'
import avatar from '@images/chat-avatar.png'
import { RootState } from '@store/store'
import { useTheme } from '@hooks/use-theme'
import { PATH, Theme } from '@config/constants'
import settings from '@images/settings.svg'
import { Rating } from '@pages/page-lobby/components/rating/rating'
import { BattleSetting } from '@pages/page-lobby/components/battle-settings/battle-settings'
import { ActiveTopicModal } from '@pages/page-lobby/components/active-forum-topic/active-forum-topic'
import { forum_mock_topics, tables_mock } from '@pages/page-lobby/mocks'
import cn from 'classnames'
import { IChatData } from '@pages/page-lobby/types'
import { NavLink } from 'react-router-dom'

export const PageLobby = () => {
  const { user } = useSelector((store: RootState) => store.user)
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
        className={cn(
          styles.window,
          themeName === Theme.Purple ? styles.purpur : styles.neon
        )}>
        <h3 className={styles.window_header}>доступные битвы</h3>
        <div className={styles.window_wrapper}>
          {tables_mock.map((table, index) => (
            <TableItem key={index} {...table} />
          ))}
        </div>
      </section>
      <section
        className={cn(
          styles.forum,
          themeName === Theme.Purple ? styles.purpur : styles.neon
        )}>
        <input
          type={'search'}
          onChange={(event: BaseSyntheticEvent) =>
            setSearchString(event.target.value)
          }
          placeholder={'Поиск по названию'}
          className={cn(
            styles.forum_search,
            themeName === Theme.Purple ? styles.purpur : styles.neon
          )}
        />
        {topicList.map((topic, index) => (
          <ForumItem key={index} {...topic} onClick={setActiveTopicId} />
        ))}
        <div className={styles.forum_input_wrapper}>
          <input
            className={cn(
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
            className={classNames(styles.forum_input_submit, {
              [styles.forum_input_submit_purpur]: themeName === Theme.Purple,
              [styles.forum_input_submit_neon]: themeName !== Theme.Purple,
            })}>
            Создать тему
          </button>
        </div>
      </section>
      <section
        className={classNames(styles.user, {
          [styles.user_purpur]: themeName === Theme.Purple,
          [styles.user_neon]: themeName === Theme.Neon,
        })}>
        <img
          src={
            user?.avatar
              ? 'https://ya-praktikum.tech/api/v2/resources' + user.avatar
              : avatar
          }
          alt={'аватар пользователя'}
          className={styles.user_avatar}
        />
        <div className={styles.user_row}>
          <span className={styles.user_name}>
            {user?.first_name} {user?.second_name}
          </span>
          <NavLink to={PATH.USER} className={styles.user_settings}>
            <img src={settings} alt={'настройки'} />
          </NavLink>
        </div>
        <a
          className={classNames(styles.user_link, {
            [styles.purpur]: themeName === Theme.Purple,
            [styles.neon]: themeName === Theme.Neon,
          })}>
          как играть?
        </a>
        <a
          className={classNames(styles.user_link, {
            [styles.purpur]: themeName === Theme.Purple,
            [styles.neon]: themeName === Theme.Neon,
          })}>
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

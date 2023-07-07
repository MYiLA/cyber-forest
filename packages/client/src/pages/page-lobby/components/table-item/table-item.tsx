import { useMemo } from 'react'
import { User } from '@config/user-types'
import userM from '../../../../assets/images/user-m.png'
import styles from './table-item.module.scss'
import { NavLink } from 'react-router-dom'
import { PATH, Theme } from '@config/constants'
import { useTheme } from '@hooks/use-theme'
import classNames from 'classnames'

interface ITableItemProps {
  id: number
  title: string
  users: User[]
  password?: number
}

export const TableItem: React.FC<ITableItemProps> = ({
  title,
  users,
  password,
}) => {
  const { themeName } = useTheme()

  function getUsersImg(users: User[]) {
    return users.map(user => {
      return user.avatar
        ? 'https://ya-praktikum.tech/api/v2/resources' + user.avatar
        : userM
    })
  }

  const usersImg = useMemo(() => getUsersImg(users), [users])

  return (
    <div
      className={classNames(styles.table, {
        [styles.purpur]: themeName === Theme.Purple,
        [styles.neon]: themeName !== Theme.Purple,
      })}>
      <h3 className={styles.table_title}>{title}</h3>
      <div className={styles.table_users}>
        {usersImg.map((user, index) => (
          <img
            key={index}
            src={user}
            alt={'аватар пользователя'}
            className={styles.table_users_img}
          />
        ))}
      </div>
      {password && (
        <input
          type={'password'}
          placeholder={'введите пароль'}
          className={styles.table_password}
        />
      )}
      <NavLink
        className={classNames(styles.table_sign, {
          [styles.purpur]: themeName === Theme.Purple,
          [styles.neon]: themeName !== Theme.Purple,
        })}
        to={`${PATH.GAME}`}>
        зайти
      </NavLink>
    </div>
  )
}

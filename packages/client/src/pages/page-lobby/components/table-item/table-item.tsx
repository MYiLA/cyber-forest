import { useEffect, useState } from 'react'
import { User } from '../../../../core/config/user-types'
import userM from '../../../../assets/images/user-m.png'
import styles from './table-item.module.scss'
import { NavLink } from 'react-router-dom'
import { PATH, Theme } from '../../../../core/config/constants'
import { useTheme } from '@hooks/use-theme'

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
  const [usersImg, setUsersImg] = useState<string[]>(getUsersImg(users))
  const { themeName } = useTheme()

  function getUsersImg(users: User[]) {
    return users.map(user => {
      return user.avatar
        ? 'https://ya-praktikum.tech/api/v2/resources' + user.avatar
        : userM
    })
  }

  useEffect(() => {
    setUsersImg(getUsersImg(users))
  }, [users])

  return (
    <div
      className={`${styles.table} ${
        themeName === Theme.Purple ? styles.purpur : styles.neon
      }`}>
      <h3 className={styles.table_title}>{title}</h3>
      <div className={styles.table_users}>
        {usersImg.map(user => {
          return (
            <img
              src={user}
              alt={'аватар пользователя'}
              className={styles.table_users_img}
            />
          )
        })}
      </div>
      {password ? (
        <input
          type={'password'}
          placeholder={'введите пароль'}
          className={styles.table_password}
        />
      ) : null}
      <NavLink
        className={`nav_link mini ${styles.table_sign} ${
          themeName === Theme.Purple ? styles.purple : styles.neon
        } `}
        to={`${PATH.GAME}`}>
        зайти
      </NavLink>
    </div>
  )
}

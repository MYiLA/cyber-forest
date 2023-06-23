import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { RootState } from '@store/store'
import { PATH, THEME } from '@config/constants'
import styles from './page-home.module.scss'

export const PageHome = () => {
  const { themeName } = useSelector((store: RootState) => store.theme)

  return (
    <div className={styles.container}>
      <h3
        className={`${styles.header} ${
          themeName === THEME.PURPUR ? styles.purpur : styles.neon
        }`}>
        киберлес
      </h3>
      <div className={styles.buttons_wrapper}>
        <NavLink
          to={PATH.LOGIN}
          className={`${styles.nav_link} ${
            themeName === THEME.PURPUR ? styles.purpur : styles.neon
          }`}>
          Вход
        </NavLink>
        <NavLink
          to={PATH.REGISTER}
          className={`${styles.nav_link} ${
            themeName === THEME.PURPUR ? styles.purpur : styles.neon
          }`}>
          {' '}
          Регистрация{' '}
        </NavLink>
      </div>
      <NavLink to={PATH.ABOUT} className={styles.sub_nav_link}>
        {' '}
        Подробнее об игре{' '}
      </NavLink>
    </div>
  )
}

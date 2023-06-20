import { NavLink } from 'react-router-dom'
import { PATH } from '../../core/config/constants'
import { useDispatch } from 'react-redux'
import { TDispatch } from '../../core/store/store'
import { toggleTheme } from '../../core/store/reducers/theme-reducer'
import styles from './test-nav.module.css'

export const TestNav = () => {
  const dispatch = useDispatch<TDispatch>()
  const changeTheme = () => {
    dispatch(toggleTheme())
  }

  return (
    <div className={styles.container}>
      <ul>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : '')}
            to={PATH.HOME}>
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : '')}
            to={PATH.GAME}>
            GAME
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : '')}
            to={PATH.LOGIN}>
            LOGIN
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : '')}
            to={PATH.REGISTER}>
            REGISTER
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : '')}
            to={PATH.FORGOT_PASSWORD}>
            FORGOT PASSWORD
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : '')}
            to={PATH.RESET_PASSWORD}>
            RESET PASSWORD
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : '')}
            to={PATH.ERROR}>
            ERROR
          </NavLink>
        </li>
        <li onClick={changeTheme}>TOGGLE THEME</li>
      </ul>
    </div>
  )
}

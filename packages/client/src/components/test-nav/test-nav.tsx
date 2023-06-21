import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../../core/store/reducers/theme-reducer'
import styles from './test-nav.module.scss'
import { useEffect } from 'react'
import { TDispatch, TRootState } from '../../core/store/store'
import { PATH } from '../../core/config/constants'

export const TestNav = () => {
  const dispatch = useDispatch<TDispatch>()
  const changeTheme = () => {
    dispatch(toggleTheme())
  }

  const { themeName } = useSelector((store: TRootState) => store.theme)
  useEffect(() => {
    document.body.className = `body-${themeName}`
  }, [themeName])

  return (
    <div className={styles.testContainer}>
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

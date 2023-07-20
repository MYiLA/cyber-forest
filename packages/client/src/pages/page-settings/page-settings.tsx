import styles from './page-settings.module.scss'
import { useTheme } from '@hooks/use-theme'
import { PATH, Theme } from '@config/constants'
import winLeft from '../../assets/images/win-left-mid.svg'
import winRight from '../../assets/images/win-rb-stroke.svg'
import back from '../../assets/images/back.svg'
import { PersonalForm } from '@pages/page-settings/components/personal-form/personal-form'
import { ChangePasswordForm } from '@pages/page-settings/components/change-password-form/change-password-form'
import { Switcher } from '@ui/switcher/switcher'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, RootState } from '@store/store'
import { setTheme } from '@store/reducers/theme-reducer'

export const PageSettings = () => {
  const { themeName } = useTheme()
  const dispatch = useDispatch<Dispatch>()
  const user = useSelector((state: RootState) => state.user.user)

  const changeTheme = () => {
    dispatch(setTheme(themeName === Theme.Purple ? Theme.Neon : Theme.Purple))
  }

  return (
    <div className={styles.container}>
      <div
        className={classNames(styles.wrapper, {
          [styles.wrapper_purple]: themeName === Theme.Purple,
          [styles.wrapper_neon]: themeName === Theme.Neon,
        })}>
        <NavLink to={PATH.LOBBY} className={styles.back}>
          <img src={back} alt={'иконка назад'} />
        </NavLink>
        <img
          src={winLeft}
          alt={'украшение окна'}
          className={styles.wrapper_left}
        />
        <img
          src={winRight}
          alt={'украшение окна'}
          className={styles.wrapper_right}
        />
        <h3 className={styles.header}>настройки аккаунта</h3>
        <PersonalForm {...user!} />
        <ChangePasswordForm />
        <div className={styles.switcher}>
          <Switcher
            labels={['пурпурная тема', 'тема неоновая']}
            state={false}
            onClick={changeTheme}
          />
        </div>
      </div>
    </div>
  )
}

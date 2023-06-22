import styles from './page-error.module.scss'
import { useSelector } from 'react-redux'
import { TRootState } from '../../core/store/store'

import { NavLink, useLocation } from 'react-router-dom'
import { PATH } from '../../core/config/constants'

const errorMessages: Record<string, string> = {
  404: 'Страница не найдена',
  500: 'Что-то пошло не так...',
}

export const PageError = () => {
  const { themeName } = useSelector((store: TRootState) => store.theme)
  const location = useLocation()

  const error = (location.state && location.state.error) || '404'

  return (
    <div className={styles.container}>
      <div className={styles[`images_${themeName}_${error}`]}>
        <div className={styles.message}>
          <h2>{error}</h2>
          <h3>{errorMessages[error]}</h3>
          {error === '404' && (
            <div className={styles.link}>
              <NavLink to={PATH.HOME}>В лобби</NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

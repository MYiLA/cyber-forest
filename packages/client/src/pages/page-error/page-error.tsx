import styles from './page-error.module.scss'

import { NavLink, useLocation } from 'react-router-dom'
import { PATH } from '@config/constants'
import { useTheme } from '@hooks/use-theme'

const errorMessages: Record<string, string> = {
  404: 'Страница не найдена',
  500: 'Что-то пошло не так...',
}

const PageError = () => {
  const { themeName } = useTheme()
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

export default PageError

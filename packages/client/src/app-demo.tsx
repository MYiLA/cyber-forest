import styles from '@pages/page-home/page-home.module.scss'
import cn from 'classnames'

export const AppDemo = () => {
  return (
    <div className={`container-purple`}>
      <div className={styles.container}>
        <h3 className={cn(styles.header, styles.purple)}>киберлес</h3>
        <div className={styles.buttons_wrapper}>
          <span className={cn(styles.nav_link, styles.purple)}>Вход</span>
          <span className={cn(styles.nav_link, styles.purple)}>
            Регистрация
          </span>
        </div>
        <span className={styles.sub_nav_link}>Подробнее об игре</span>
      </div>
    </div>
  )
}

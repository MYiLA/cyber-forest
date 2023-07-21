import { devsInfo } from '@pages/page-info/constant'
import { DescriptionDevsCard } from '@pages/page-info/entities/devs-card/devs-card'
import styles from '../../page-info.module.scss'

export const DevsTab = () => {
  return (
    <div className={styles.tab_grid}>
      {devsInfo.map(dev => {
        return <DescriptionDevsCard {...dev} />
      })}
    </div>
  )
}

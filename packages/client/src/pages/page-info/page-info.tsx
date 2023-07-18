import { DialogWindow } from '@ui/dialog-window/dialog-window'
import styles from './page-info.module.scss'
import { useTheme } from '@hooks/use-theme'
import { PATH, Theme } from '@config/constants'
import cn from 'classnames'
import React, { useState } from 'react'
import { DescriptionGameTab } from '@pages/page-info/entities/description-tabs/description-tab'
import { DevsTab } from '@pages/page-info/entities/devs-tab/devs-tab'
import { NavLink } from 'react-router-dom'
import back from '@images/back.svg'

const PageInfo = () => {
  const { themeName } = useTheme()
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className={styles.container}>
      <h3
        className={cn(styles.header, {
          [styles.header_purlpe]: themeName === Theme.Purple,
          [styles.header_neon]: themeName === Theme.Neon,
        })}>
        киберлес
        {activeTab === 1 && <span>разработчики</span>}
      </h3>
      <DialogWindow extraClass={styles.wrapper}>
        <NavLink to={PATH.LOBBY} className={styles.back}>
          <img src={back} alt={'иконка назад'} />
        </NavLink>
        <div
          className={cn({
            [styles.tab_section_active]: activeTab === 0,
            [styles.tab_section]: activeTab !== 0,
          })}>
          <DescriptionGameTab />
        </div>
        <div
          className={cn({
            [styles.tab_section_active]: activeTab === 1,
            [styles.tab_section]: activeTab !== 1,
          })}>
          <DevsTab />
        </div>
        <footer className={styles.tab}>
          <div
            className={cn(styles.tab_sign, {
              [styles.tab_sign_active]: activeTab === 0,
              [styles.tab_sign]: activeTab !== 0,
            })}
          />
          <div
            className={cn(styles.tab_sign, {
              [styles.tab_sign_active]: activeTab === 1,
              [styles.tab_sign_unactive]: activeTab !== 1,
            })}
          />
        </footer>
        <button
          className={styles.tab_next_button}
          onClick={() => {
            const tab = activeTab === 0 ? 1 : 0

            setActiveTab(tab)
          }}>
          {activeTab === 0
            ? 'перейти к информации о разработчиках'
            : 'вернуться к основной информации'}
        </button>
      </DialogWindow>
    </div>
  )
}

export default PageInfo

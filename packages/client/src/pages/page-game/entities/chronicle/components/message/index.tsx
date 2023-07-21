import { GloryCounter } from '@pages/page-game/entities/glory-counter'
import { ChronicleMessage } from '../../type'
import styles from './message.module.scss'
import React from 'react'

type MessageProps = {
  message: ChronicleMessage
}

export const Message = ({ message }: MessageProps) => {
  const { player, desc } = message
  return (
    <>
      <div className={styles.glory_wrap}>
        <GloryCounter
          key={`${player.type}-${player?.id}`}
          gloryCount={player.gloryCount}
          playerType={player.type}
        />
      </div>
      <p className={styles.desc}>{desc}</p>
    </>
  )
}

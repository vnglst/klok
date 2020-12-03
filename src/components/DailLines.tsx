import React from 'react'
import { FC } from 'react'
import styles from './DailLines.module.css'

const DailLines: FC = () => {
  const dialLines = []
  for (let i = 1; i <= 60; i++) {
    dialLines.push(
      <div
        key={i}
        className={styles.diallines}
        style={{ transform: `rotate(${6 * i}deg)` }}
      />,
    )
  }
  return <>{dialLines}</>
}

export default DailLines

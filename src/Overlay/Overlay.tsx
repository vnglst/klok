import * as React from 'react'
import { FC } from 'react'
import styles from './Overlay.module.css'

export interface OverlayProps {
  className?: string
}

const Overlay: FC<OverlayProps> = ({ className, children }) => {
  let cx = styles['overlay-content'] + ' ' + styles['slide-in-top']
  if (className) cx += ' ' + className
  return (
    <div className={styles.overlay}>
      <div className={cx}>{children}</div>
    </div>
  )
}

export default Overlay

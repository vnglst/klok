import React, { FC, MouseEvent, TouchEvent, useRef } from 'react'
import styles from './Clock.module.css'
import DialLines from './DailLines'

export interface ClockProps {
  setTracking: (s: string) => void
  setHoursHand: (n: number) => void
  setMinutesHand: (n: number) => void
  hoursHand: number
  minutesHand: number
  secondsHand: number
  tracking: string
}

const Clock: FC<ClockProps> = ({
  setTracking,
  setHoursHand,
  setMinutesHand,
  hoursHand,
  minutesHand,
  secondsHand,
  tracking,
}) => {
  const clockFace = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e
    handleHandTracking({ clientX, clientY })
  }

  const handleTouchMove = (e: TouchEvent) => {
    const { clientX, clientY } = e.touches[0]
    handleHandTracking({ clientX, clientY })
  }

  const handleHandTracking = (position: {
    clientX: number
    clientY: number
  }) => {
    // don't update hands if none selected
    if (tracking === 'none') return

    if (!clockFace.current) return
    const { x, y, width, height } = clockFace.current.getBoundingClientRect()

    // calculate x and y based on origin in centre of clock
    const { clientX, clientY } = position

    const originX = Math.round(x + width / 2)
    const originY = Math.round(y + height / 2)
    const absX = clientX - originX
    const absY = -(clientY - originY)

    let angle = Math.atan2(absX, absY) * (180 / Math.PI)

    // snap to dial lines
    angle = Math.round(angle / 6) * 6

    // convert degrees to positive range [0 - 360)
    angle = (angle + 360) % 360

    if (tracking === 'hours') setHoursHand(angle)
    if (tracking === 'minutes') setMinutesHand(angle)
  }

  return (
    <div
      className={styles['clock-face']}
      onMouseUp={() => setTracking('none')}
      onTouchEnd={() => setTracking('none')}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      ref={clockFace}
    >
      <div className={styles['hands-dot']} />
      <div className={styles['centre-dot']} />
      <div>
        <button
          data-test-id="minutes-hand"
          className={styles['hand-button']}
          style={{
            transform: `rotate(${minutesHand}deg)`,
          }}
          onMouseDown={() => setTracking('minutes')}
          onTouchStart={() => setTracking('minutes')}
        >
          <span className="visually-hidden">minutes hand</span>
          <div className={styles['minute-hand']}>
            <div className={styles['hand-ball']} />
          </div>
          {tracking === 'minutes' && (
            <span className={styles['hand-helper-line']} />
          )}
        </button>
        <button
          data-test-id="hours-hand"
          className={styles['hand-button']}
          style={{
            transform: `rotate(${hoursHand}deg)`,
          }}
          onMouseDown={() => setTracking('hours')}
          onTouchStart={() => setTracking('hours')}
        >
          <span className="visually-hidden">hours hand</span>
          <div className={styles['hour-hand']}>
            <div className={styles['hand-ball']} />
          </div>
          {tracking === 'hours' && (
            <span className={styles['hand-helper-line']} />
          )}
        </button>
        <div
          className={styles['seconds-hand']}
          style={{
            transform: `rotate(${secondsHand}deg)`,
            // Don't animate at 12 (0 degrees) as this causes flicker
            transition: secondsHand === 0 ? 'none' : '',
          }}
        />
      </div>
      <div>
        <span className={[styles.hour, styles.h3].join(' ')}>3</span>
        <span className={[styles.hour, styles.h6].join(' ')}>6</span>
        <span className={[styles.hour, styles.h9].join(' ')}>9</span>
        <span className={[styles.hour, styles.h12].join(' ')}>12</span>
      </div>
      <div>
        <DialLines />
      </div>
    </div>
  )
}

export default Clock

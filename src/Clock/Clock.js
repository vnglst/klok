import React, { useRef } from 'react'

function Clock({
  setTracking,
  setHoursHand,
  setMinutesHand,
  hoursHand,
  minutesHand,
  secondsHand,
  tracking
}) {
  const origin = useRef(null)

  const handleMouseMove = e => {
    const { clientX, clientY } = e
    handleHandTracking({ clientX, clientY })
  }

  const handleTouchMove = e => {
    const { clientX, clientY } = e.touches[0]
    handleHandTracking({ clientX, clientY })
  }

  const handleHandTracking = position => {
    // don't update hands if none selected
    if (tracking === 'none') return

    // calculate x and y based on origin in centre of clock
    const { clientX, clientY } = position
    const { x, y, width, height } = origin.current.getBoundingClientRect()
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
      className="clock"
      onMouseUp={() => setTracking('none')}
      onTouchEnd={() => setTracking('none')}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      <div className="dot" ref={origin} />
      <div>
        <button
          className="hand-button"
          style={{
            transform: `rotate(${hoursHand}deg)`
          }}
          onMouseDown={() => setTracking('hours')}
          onTouchStart={() => setTracking('hours')}
        >
          <div className="hour-hand" />
          {tracking === 'hours' && <span className="hand-helper-line" />}
        </button>
        <button
          className="hand-button"
          style={{
            transform: `rotate(${minutesHand}deg)`
          }}
          onMouseDown={() => setTracking('minutes')}
          onTouchStart={() => setTracking('minutes')}
        >
          <div className="minute-hand" />
          {tracking === 'minutes' && <span className="hand-helper-line" />}
        </button>
        <div
          className="seconds-hand"
          style={{
            transform: `rotate(${secondsHand}deg)`,
            // Don't animate at 12 (0 degrees) as this causes flicker
            transition: secondsHand === 0 ? 'none' : ''
          }}
        />
      </div>
      <div>
        <span className="hour h3">3</span>
        <span className="hour h6">6</span>
        <span className="hour h9">9</span>
        <span className="hour h12">12</span>
      </div>
      {renderDialLines()}
    </div>
  )
}

function renderDialLines() {
  const dialLines = []
  for (let i = -1; i < 59; i++) {
    dialLines.push(
      <div
        key={i}
        className="diallines"
        style={{ transform: `rotate(${6 * i}deg)` }}
      />
    )
  }
  return dialLines
}

export default Clock
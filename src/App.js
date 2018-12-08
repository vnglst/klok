/*

Credits:
- CSS + HTML inspired by: https://codepen.io/vaskopetrov/pen/yVEXjz
- Also: Wes Bos: https://www.youtube.com/watch?v=xu87YWbr4X0

Uses:
- Netlify
- create-react-app v2
- React hooks!

Supports:
- PWA
- app like mobile experience


*/

import React, { useState, useRef, useEffect } from 'react'
import './App.css'
import Overlay from './Overlay'
import Button from './Button'

const getSecondsInDegrees = () => {
  const now = new Date()
  const seconds = now.getSeconds()
  return seconds * 6
}

const timeToDigitalStr = (hours, minutes) => {
  const minutesStr = `${minutes}`.padStart(2, '0')
  return `${hours}:${minutesStr}`
}

const generateState = () => {
  return {
    expectedHours: Math.round(Math.random() * 12 + 1), // hours [1 - 12]
    expectedMinutes: 0, // minutes [0 - 59]
    hoursHand: Math.round(Math.random() * 360), // in degrees
    minutesHand: Math.round(Math.random() * 360), // in degrees
    secondsHand: getSecondsInDegrees(),
    tracking: 'none'
  }
}

const INIT = generateState()

const App = () => {
  const [expectedHours, setExpectedHours] = useState(INIT.expectedHours)
  const [expectedMinutes, setExpectedMinutes] = useState(INIT.expectedMinutes)
  const [hoursHand, setHoursHand] = useState(INIT.hoursHand)
  const [minutesHand, setMinutesHand] = useState(INIT.minutesHand)
  const [secondsHand, setSecondsHand] = useState(INIT.secondsHand)
  const [tracking, setTracking] = useState(INIT.tracking)

  const origin = useRef(null)

  useEffect(() => {
    setInterval(() => {
      setSecondsHand(getSecondsInDegrees())
    }, 1000)
  })

  const resetState = () => {
    const newState = generateState()
    setExpectedHours(newState.expectedHours)
    setExpectedMinutes(newState.expectedMinutes)
    setHoursHand(newState.hoursHand)
    setMinutesHand(newState.minutesHand)
    setSecondsHand(newState.secondsHand)
    setTracking(newState.tracking)
  }

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

  const renderDialLines = () => {
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

  const isDone = () => {
    // if user is still dragging hands, she's not done yet
    if (tracking !== 'none') return false

    const expectedHoursInDegrees = expectedHours * 30
    const expectedMinutesInDegrees = expectedMinutes * 6

    return (
      expectedHoursInDegrees === hoursHand &&
      expectedMinutesInDegrees === minutesHand
    )
  }

  const hoursStyle = {
    transform: `rotate(${hoursHand}deg)`
  }

  const minutesStyle = {
    transform: `rotate(${minutesHand}deg)`
  }

  const secondsStyle = {
    transform: `rotate(${secondsHand}deg)`
  }

  // Dont animate at 12 (0 degrees) as this causes flicker
  if (secondsHand === 0) {
    secondsStyle.transition = 'none'
  } else {
    secondsStyle.transition = ''
  }

  return (
    <div className="background">
      {isDone() && (
        <Overlay>
          <Button onClick={() => resetState()}>Well done!</Button>
        </Overlay>
      )}
      <div className="app">
        <div className="question">
          <p>
            set the time to{' '}
            <b>{timeToDigitalStr(expectedHours, expectedMinutes)}</b>
          </p>
        </div>
        <div
          className="clock"
          onMouseUp={() => setTracking('none')}
          onTouchEnd={() => setTracking('none')}
          onMouseMove={e => handleMouseMove(e)}
          onTouchMove={e => handleTouchMove(e)}
        >
          <div className="dot" ref={origin} />
          <div>
            <button
              className="hand-button"
              style={hoursStyle}
              onMouseDown={() => setTracking('hours')}
              onTouchStart={() => setTracking('hours')}
            >
              <div className="hour-hand" />
              {tracking === 'hours' && <span className="hand-helper-line" />}
            </button>
            <button
              className="hand-button"
              style={minutesStyle}
              onMouseDown={() => setTracking('minutes')}
              onTouchStart={() => setTracking('minutes')}
            >
              <div className="minute-hand" />
              {tracking === 'minutes' && <span className="hand-helper-line" />}
            </button>
            <div className="second-hand" style={secondsStyle} />
          </div>
          <div>
            <span className="hour h3">3</span>
            <span className="hour h6">6</span>
            <span className="hour h9">9</span>
            <span className="hour h12">12</span>
          </div>
          {renderDialLines()}
        </div>
      </div>
    </div>
  )
}

export default App

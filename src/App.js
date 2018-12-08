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

import React, { useState, useEffect } from 'react'
import './App.css'
import Overlay from './Overlay'
import Button from './Button'
import Clock from './Clock'

const INIT = generateState()

function generateState() {
  return {
    expectedHours: Math.round(Math.random() * 12 + 1), // hours [1 - 12]
    expectedMinutes: 0, // minutes [0 - 59]
    hoursHand: Math.round(Math.random() * 360), // in degrees
    minutesHand: Math.round(Math.random() * 360), // in degrees
    secondsHand: getSecondsInDegrees(),
    tracking: 'none'
  }
}

function App() {
  const [expectedHours, setExpectedHours] = useState(INIT.expectedHours)
  const [expectedMinutes, setExpectedMinutes] = useState(INIT.expectedMinutes)
  const [hoursHand, setHoursHand] = useState(INIT.hoursHand)
  const [minutesHand, setMinutesHand] = useState(INIT.minutesHand)
  const [secondsHand, setSecondsHand] = useState(INIT.secondsHand)
  const [tracking, setTracking] = useState(INIT.tracking)

  useEffect(() => {
    setInterval(() => {
      setSecondsHand(getSecondsInDegrees())
    }, 1000)
  }, [])

  const resetState = () => {
    const newState = generateState()
    setExpectedHours(newState.expectedHours)
    setExpectedMinutes(newState.expectedMinutes)
    setHoursHand(newState.hoursHand)
    setMinutesHand(newState.minutesHand)
    setSecondsHand(newState.secondsHand)
    setTracking(newState.tracking)
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

  return (
    <div className="background">
      {isDone() && (
        <Overlay>
          <Button onClick={resetState}>Well done!</Button>
        </Overlay>
      )}
      <div className="app">
        <div className="question">
          <p>
            set the time to{' '}
            <b>{timeToDigitalStr(expectedHours, expectedMinutes)}</b>
          </p>
        </div>
        <Clock
          setTracking={setTracking}
          setHoursHand={setHoursHand}
          setMinutesHand={setMinutesHand}
          hoursHand={hoursHand}
          minutesHand={minutesHand}
          secondsHand={secondsHand}
          tracking={tracking}
        />
      </div>
    </div>
  )
}

function getSecondsInDegrees() {
  const now = new Date()
  const seconds = now.getSeconds()
  return seconds * 6
}

function timeToDigitalStr(hours, minutes) {
  const minutesStr = `${minutes}`.padStart(2, '0')
  return `${hours}:${minutesStr}`
}

export default App

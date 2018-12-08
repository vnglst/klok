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
import styled from 'styled-components'

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

/* fixed background container to disable view scrolling on mobile */
const Background = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`

const AppContent = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
`

const Question = styled.div`
  margin-top: 50px;
  width: 300px;
  border-radius: 7px;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  color: #000;
  font-size: 18px;
  letter-spacing: 2px;
  border: 1px solid black;
  background: white;
`

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
    <Background>
      {isDone() && (
        <Overlay>
          <Button onClick={resetState}>Well done!</Button>
        </Overlay>
      )}
      <AppContent>
        <Question>
          <p>
            set the time to{' '}
            <b>{timeToDigitalStr(expectedHours, expectedMinutes)}</b>
          </p>
        </Question>
        <Clock
          setTracking={setTracking}
          setHoursHand={setHoursHand}
          setMinutesHand={setMinutesHand}
          hoursHand={hoursHand}
          minutesHand={minutesHand}
          secondsHand={secondsHand}
          tracking={tracking}
        />
      </AppContent>
    </Background>
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

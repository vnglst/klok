/*

CSS + HTML inspired by: https://codepen.io/vaskopetrov/pen/yVEXjz

*/

import React, { Component } from 'react'
import './App.css'
import Overlay from './Overlay'
import Button from './Button'

const getSecondsInDegrees = () => {
  const now = new Date()
  const seconds = now.getSeconds()
  return seconds * 6
}

const timeToDigitalStr = (hours, minutes) => {
  return `${hours}:${minutes}`
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = this.initialState()
  }

  initialState() {
    return {
      expectedHours: Math.round(Math.random() * 12 + 1), // hours [1 - 12]
      expectedMinutes: Math.round(Math.random() * 60), // minutes [0 - 59]
      hoursHand: Math.round(Math.random() * 360), // in degrees
      minutesHand: Math.round(Math.random() * 360), // in degrees
      secondsHand: getSecondsInDegrees(),
      tracking: 'none'
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ secondsHand: getSecondsInDegrees() })
    }, 1000)
  }

  resetState = () => {
    this.setState(this.initialState())
  }

  handleMouseMove(e) {
    const { clientX, clientY } = e
    this.handleHandTracking({ clientX, clientY })
  }

  handleTouchMove(e) {
    const { clientX, clientY } = e.touches[0]
    this.handleHandTracking({ clientX, clientY })
  }

  handleHandTracking(position) {
    const { tracking } = this.state

    // don't update hands if none selected
    if (tracking === 'none') return

    const { clientX, clientY } = position
    const { x, y, width, height } = this.origin.getBoundingClientRect()
    const originX = Math.round(x + width / 2)
    const originY = Math.round(y + height / 2)
    const absX = clientX - originX
    const absY = -(clientY - originY)

    let angle = Math.atan2(absX, absY) * (180 / Math.PI)

    // snap to dial line grid
    angle = Math.round(angle / 6) * 6

    // convert degrees to positive range [0 - 360)
    angle = (angle + 360) % 360

    if (tracking === 'hours') this.setState({ hoursHand: angle })
    if (tracking === 'minutes') this.setState({ minutesHand: angle })
  }

  startHandTracking(handStr) {
    this.setState({ tracking: handStr })
  }

  stopHandTracking(e) {
    this.setState({ tracking: 'none' })
  }

  renderDialLines() {
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

  isDone = () => {
    const {
      hoursHand,
      minutesHand,
      tracking,
      expectedHours,
      expectedMinutes
    } = this.state

    // if user is still dragging hands, she's not done yet
    if (tracking !== 'none') return false

    const expectedHoursInDegrees = expectedHours * 30
    const expectedMinutesInDegrees = expectedMinutes * 6

    return (
      expectedHoursInDegrees === hoursHand &&
      expectedMinutesInDegrees === minutesHand
    )
  }

  render() {
    const {
      hoursHand,
      minutesHand,
      secondsHand,
      tracking,
      expectedHours,
      expectedMinutes
    } = this.state

    const hoursStyle = {
      transform: `rotate(${hoursHand}deg)`,
      boxShadow: tracking === 'hours' ? `0 0 1pt 1pt red` : 'none'
    }

    const minutesStyle = {
      transform: `rotate(${minutesHand}deg)`,
      boxShadow: tracking === 'minutes' ? `0 0 1pt 1pt red` : 'none'
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
        {this.isDone() && (
          <Overlay>
            <Button onClick={() => this.resetState()}>Well done!</Button>
          </Overlay>
        )}
        <div className="app">
          <div className="info">
            <p>
              set the time to{' '}
              <b>{timeToDigitalStr(expectedHours, expectedMinutes)}</b>
            </p>
          </div>
          <div
            className="clock"
            onMouseUp={e => this.stopHandTracking(e)}
            onTouchEnd={e => this.stopHandTracking(e)}
            onMouseMove={e => this.handleMouseMove(e)}
            onTouchMove={e => this.handleTouchMove(e)}
          >
            <div className="dot" ref={el => (this.origin = el)} />
            <div>
              <button
                className="hour-hand"
                style={hoursStyle}
                onMouseDown={e => this.startHandTracking('hours')}
                onTouchStart={e => this.startHandTracking('hours')}
              >
                {tracking === 'hours' && <span className="hours-line" />}
              </button>
              <button
                className="minute-hand"
                style={minutesStyle}
                onMouseDown={e => this.startHandTracking('minutes')}
                onTouchStart={e => this.startHandTracking('minutes')}
              >
                {tracking === 'minutes' && <span className="minutes-line" />}
              </button>
              <div className="second-hand" style={secondsStyle} />
            </div>
            <div>
              <span className="h3">3</span>
              <span className="h6">6</span>
              <span className="h9">9</span>
              <span className="h12">12</span>
            </div>
            {this.renderDialLines()}
          </div>
        </div>
      </div>
    )
  }
}

export default App

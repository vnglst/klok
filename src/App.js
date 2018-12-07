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

class App extends Component {
  constructor(props) {
    super(props)
    this.state = this.initialState()
  }

  initialState() {
    return {
      expectedHours: Math.round(Math.random() * 12),
      expectedMinutes: 0,
      hoursHand: Math.round(Math.random() * 360),
      minutesHand: Math.round(Math.random() * 360),
      secondsHand: getSecondsInDegrees(),
      trackHand: 'none'
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
    const { trackHand } = this.state

    // don't update hands if none selected
    if (trackHand === 'none') return

    const { clientX, clientY } = position
    const { x, y, width, height } = this.origin.getBoundingClientRect()
    const originX = Math.round(x + width / 2)
    const originY = Math.round(y + height / 2)
    const absX = clientX - originX
    const absY = -(clientY - originY)
    let angle = Math.atan2(absX, absY) * (180 / Math.PI)
    if (angle < 0) angle += 360

    if (trackHand === 'hours') this.setState({ hoursHand: angle })
    if (trackHand === 'minutes') this.setState({ minutesHand: angle })
  }

  startHandTracking(handStr) {
    this.setState({ trackHand: handStr })
  }

  stopHandTracking(e) {
    this.setState({ trackHand: 'none' })
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
      trackHand,
      expectedHours,
      expectedMinutes
    } = this.state

    // if user is still dragging hands, she's not done yet
    if (trackHand !== 'none') return false

    const expectedHoursInDegrees = expectedHours * 30

    const isWithinMargin = (angle1, angle2, margin) => {
      const diff = 180 - Math.abs(Math.abs(angle1 - angle2) - 180)
      return diff <= margin
    }

    return (
      isWithinMargin(minutesHand, expectedMinutes, 5) &&
      isWithinMargin(hoursHand, expectedHoursInDegrees, 5)
    )
  }

  render() {
    const {
      hoursHand,
      minutesHand,
      secondsHand,
      trackHand,
      expectedHours
    } = this.state

    const hoursStyle = {
      transform: `rotate(${hoursHand}deg)`,
      boxShadow: trackHand === 'hours' ? `0 0 3pt 1pt red` : 'none'
    }

    const minutesStyle = {
      transform: `rotate(${minutesHand}deg)`,
      boxShadow: trackHand === 'minutes' ? `0 0 3pt 1pt red` : 'none'
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
              set the clock to <b>{expectedHours} O'Clock</b>
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
                {trackHand === 'hours' && <span className="hours-line" />}
              </button>
              <button
                className="minute-hand"
                style={minutesStyle}
                onMouseDown={e => this.startHandTracking('minutes')}
                onTouchStart={e => this.startHandTracking('minutes')}
              >
                {trackHand === 'minutes' && <span className="minutes-line" />}
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

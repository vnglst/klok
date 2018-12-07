import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hoursHand: 180,
      minutesHand: 30,
      trackHand: 'none'
    }
  }

  // only track hand after it has been clicked
  handleHandTracking(e) {
    const { trackHand } = this.state

    if (trackHand === 'none') return

    const { clientX, clientY } = e
    const { x, y, width, height } = this.origin.getBoundingClientRect()
    const originX = Math.round(x + width / 2)
    const originY = Math.round(y + height / 2)
    const absX = -(clientX - originX)
    const absY = -(clientY - originY)
    const angle = Math.round(Math.atan2(absY, absX) * (180 / Math.PI))

    if (trackHand === 'hours') this.setState({ hoursHand: angle })
    if (trackHand === 'minutes') this.setState({ minutesHand: angle })
  }

  startHandTracking(handStr) {
    this.setState({ trackHand: handStr })
  }

  stopHandTracking(e) {
    this.setState({ trackHand: 'none' })
  }

  render() {
    const { hoursHand, minutesHand } = this.state

    const hoursStyle = {
      transform: `rotate(${hoursHand}deg)`
    }

    const minutesStyle = {
      transform: `rotate(${minutesHand}deg)`
    }

    return (
      <div className="Background">
        <div className="App">
          <div
            className="Clock"
            onMouseUp={e => this.stopHandTracking(e)}
            onTouchEnd={e => this.stopHandTracking(e)}
          >
            <div
              className="Face"
              onMouseMove={e => this.handleHandTracking(e)}
              onTouchMove={e => this.handleHandTracking(e)}
            >
              <span className="Digit Digit12">12</span>
              <span className="Digit Digit3">3</span>
              <span className="Digit Digit6">6</span>
              <span className="Digit Digit9">9</span>
              <button
                className="HandHours"
                style={hoursStyle}
                onMouseDown={e => this.startHandTracking('hours')}
                onTouchStart={e => this.startHandTracking('hours')}
              />
              <button
                className="Hand"
                style={minutesStyle}
                onMouseDown={e => this.startHandTracking('minutes')}
                onTouchStart={e => this.startHandTracking('minutes')}
              />
              <div className="ClockCenter" ref={el => (this.origin = el)} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

import { getSecondsInDegrees } from './getSecondsInDegrees'

export type Levels = 'hours' | 'half' | '15min' | 'minutes'

export function generateState(level: Levels) {
  let expectedMinutes = 0

  if (level === 'half')
    expectedMinutes = (Math.round(Math.random() * 2 + 1) * 30) % 60
  if (level === '15min')
    expectedMinutes = (Math.round(Math.random() * 4 + 1) * 15) % 60
  if (level === 'minutes')
    expectedMinutes = Math.round(Math.random() * 60 + 1) % 60

  return {
    expectedHours: Math.round(Math.random() * 12 + 1),
    expectedMinutes: expectedMinutes,
    hoursHand: Math.round(Math.random() * 360),
    minutesHand: Math.round(Math.random() * 360),
    secondsHand: getSecondsInDegrees(),
    tracking: 'none',
  }
}

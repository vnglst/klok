import { Levels } from './generateState'

export const getPoints = (level: Levels) => {
  if (level === 'hours') return 1
  if (level === 'half') return 2
  if (level === '15min') return 3
  if (level === 'minutes') return 4

  const ensure: never = level
  return ensure
}

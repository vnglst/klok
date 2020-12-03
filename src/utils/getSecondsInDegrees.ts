export function getSecondsInDegrees() {
  const now = new Date()
  const seconds = now.getSeconds()
  return seconds * 6
}

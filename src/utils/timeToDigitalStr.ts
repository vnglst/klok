export function timeToDigitalStr(hours: number, minutes: number) {
  const minutesStr = `${minutes}`.padStart(2, '0')
  return `${hours}:${minutesStr}`
}

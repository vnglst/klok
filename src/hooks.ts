import { useState } from 'react'

type UsePersist = <T>(
  key: string,
  initialState: T,
) => [T, (newState: T) => void]

export const usePersist: UsePersist = (key, initialState) => {
  const [state, setState] = useState(
    typeof window === 'undefined'
      ? initialState
      : JSON.parse(localStorage.getItem(key) || 'false') || initialState,
  )

  const setStateWithStorage = (newState: typeof initialState) => {
    localStorage.setItem(key, JSON.stringify(newState))
    setState(newState)
  }

  return [state, setStateWithStorage]
}

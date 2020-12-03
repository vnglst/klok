import { Box, Flex, Heading, useDisclosure } from '@chakra-ui/react'
import { default as React, FC, useEffect, useState } from 'react'
import Clock from './components/Clock'
import NextGameModal from './components/NextGameModal'
import Settings from './components/Settings'
import { usePersist } from './hooks'
import {
  generateState,
  getPoints,
  getSecondsInDegrees,
  Levels,
  timeToDigitalStr,
} from './utils'

const App: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [level, setLevel] = usePersist('klok-level', 'hours' as Levels)
  const INIT = generateState(level)
  const [expectedHours, setExpectedHours] = useState(INIT.expectedHours)
  const [expectedMinutes, setExpectedMinutes] = useState(INIT.expectedMinutes)
  const [hoursHand, setHoursHand] = useState(INIT.hoursHand)
  const [minutesHand, setMinutesHand] = useState(INIT.minutesHand)
  const [secondsHand, setSecondsHand] = useState(INIT.secondsHand)
  const [tracking, setTracking] = useState(INIT.tracking)
  const [points, setPoints] = usePersist('klok-points', 0)

  const pointsEarned = getPoints(level)

  useEffect(() => {
    setInterval(() => {
      setSecondsHand(getSecondsInDegrees())
    }, 1000)
  }, [])

  useEffect(() => {
    // if user is still dragging hands, she's not done yet
    if (tracking !== 'none') return

    // 12 'o clock = 360 = 0 degrees
    const expectedHoursInDegrees = (expectedHours * 30) % 360
    const expectedMinutesInDegrees = expectedMinutes * 6

    if (
      expectedHoursInDegrees === hoursHand &&
      expectedMinutesInDegrees === minutesHand
    ) {
      onOpen()
    }
  }, [expectedHours, expectedMinutes, hoursHand, minutesHand, tracking, onOpen])

  const handleModalClose = () => {
    setPoints(points + pointsEarned)
    startNewGame()
    onClose()
  }

  const handleSetLevel = (level: Levels) => {
    setLevel(level)
    startNewGame(level)
  }

  const startNewGame = (newLevel?: Levels) => {
    const newState = generateState(newLevel || level)
    setExpectedHours(newState.expectedHours)
    setExpectedMinutes(newState.expectedMinutes)
    setHoursHand(newState.hoursHand)
    setMinutesHand(newState.minutesHand)
    setSecondsHand(newState.secondsHand)
    setTracking(newState.tracking)
  }

  return (
    <Box
      position="fixed"
      left="0"
      right="0"
      top="0"
      bottom="0"
      backgroundColor="#ffffff"
      backgroundImage={`url("data:image/svg+xml,%3Csvg width='42' height='44' viewBox='0 0 42 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.12'%3E%3Cpath d='M0 0h42v44H0V0zm1 1h40v20H1V1zM0 23h20v20H0V23zm22 0h20v20H22V23z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}
    >
      <NextGameModal
        isOpen={isOpen}
        onClose={handleModalClose}
        pointsEarned={pointsEarned}
      />
      <Flex ml="auto" p={6}>
        <Settings points={points} setLevel={handleSetLevel} level={level} />
      </Flex>
      <Flex p={2}>
        <Heading width="100%" as="h1" fontWeight="900" textAlign="center">
          stel de tijd in op
          <br />
          {timeToDigitalStr(expectedHours, expectedMinutes)}
        </Heading>
      </Flex>
      <Clock
        setTracking={setTracking}
        setHoursHand={setHoursHand}
        setMinutesHand={setMinutesHand}
        hoursHand={hoursHand}
        minutesHand={minutesHand}
        secondsHand={secondsHand}
        tracking={tracking}
      />
    </Box>
  )
}

export default App

import {
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { default as React, FC, useEffect, useState } from 'react'
import { GiCog, GiLightBulb } from 'react-icons/gi'
import styles from './App.module.css'
import Clock from './Clock/Clock'
import { usePersist } from './hooks'

function getSecondsInDegrees() {
  const now = new Date()
  const seconds = now.getSeconds()
  return seconds * 6
}

function timeToDigitalStr(hours: number, minutes: number) {
  const minutesStr = `${minutes}`.padStart(2, '0')
  return `${hours}:${minutesStr}`
}

function generateState() {
  return {
    expectedHours: Math.round(Math.random() * 12 + 1), // hours [0 - 12]
    expectedMinutes: (Math.round(Math.random() * 4 + 1) * 15) % 60, // minutes [0 - 59]
    hoursHand: Math.round(Math.random() * 360), // in degrees
    minutesHand: Math.round(Math.random() * 360), // in degrees
    secondsHand: getSecondsInDegrees(),
    tracking: 'none',
  }
}

const INIT = generateState()

const App: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [expectedHours, setExpectedHours] = useState(INIT.expectedHours)
  const [expectedMinutes, setExpectedMinutes] = useState(INIT.expectedMinutes)
  const [hoursHand, setHoursHand] = useState(INIT.hoursHand)
  const [minutesHand, setMinutesHand] = useState(INIT.minutesHand)
  const [secondsHand, setSecondsHand] = useState(INIT.secondsHand)
  const [tracking, setTracking] = useState(INIT.tracking)
  const [points, setPoints] = usePersist('klok-points', 0)

  const pointsInc = 1

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

  const handleNextGame = () => {
    setPoints(points + pointsInc)
    const newState = generateState()
    setExpectedHours(newState.expectedHours)
    setExpectedMinutes(newState.expectedMinutes)
    setHoursHand(newState.hoursHand)
    setMinutesHand(newState.minutesHand)
    setSecondsHand(newState.secondsHand)
    setTracking(newState.tracking)
    onClose()
  }

  return (
    <div className={styles['background']}>
      {/* {!isDone() && (
        <Overlay>
          <Flex
            flexDir="column"
            justifyItems="center"
            justifyContent="center"
            alignContent="center"
            maxW="lg"
            borderRadius="lg"
            overflow="hidden"
            shadow="xl"
            p={24}
          >
            <Text>
              Goed zo! Je hebt {pointsInc}
              <Box as={GiLightBulb} color="yellow.400" /> verdiend.
            </Text>
            <Button colorScheme="blue" size="lg" onClick={handleNextGame} p={6}>
              Volgende klok!
            </Button>
          </Flex>
        </Overlay>
      )} */}

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={handleNextGame}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="3xl" textAlign="center">
            Goed gedaan!
          </ModalHeader>
          <ModalBody textAlign="center">
            <Box
              mt={6}
              px="auto"
              width="100%"
              size={75}
              as={GiLightBulb}
              color="yellow.400"
            />
            <Text textAlign="center" fontSize="lg" my={10}>
              Je hebt de goede tijd geselecteerd.
              <br />
              Daarmee heb je <b>{pointsInc}</b> lampje(s) verdiend!
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" size="lg" onClick={handleNextGame}>
              Volgende klok!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Flex ml="auto" zIndex="99" p={6}>
        <Menu>
          <MenuButton shadow="xl" as={Button} colorScheme="pink">
            <GiCog />
          </MenuButton>
          <MenuList>
            <MenuGroup title="Stats">
              <MenuItem display="flex" justifyContent="space-between">
                Score
                <Flex alignItems="center" fontSize="xs" textColor="gray.800">
                  <Box as={GiLightBulb} color="yellow.400" />
                  <Text ml={2}>{points}</Text>
                </Flex>
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Instellingen">
              <MenuItem>Uren</MenuItem>
              <MenuItem>Halfuren</MenuItem>
              <MenuItem>Kwartieren</MenuItem>
              <MenuItem>Minuten</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Flex>

      <Flex p={2}>
        <Heading width="100%" as="h1" textAlign="center" lineHeight={1.6}>
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
    </div>
  )
}

export default App

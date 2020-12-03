import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuList,
} from '@chakra-ui/react'
import { default as React, FC } from 'react'
import { GiCheckMark, GiCog, GiLightBulb } from 'react-icons/gi'
import { Levels } from '../utils'
import MyMenuItem from './MyMenuItem'

export interface SettingsProps {
  points: number
  setLevel: (level: Levels) => void
  level: Levels
}

const Settings: FC<SettingsProps> = ({ points, setLevel, level }) => {
  return (
    <Menu>
      <MenuButton shadow="xl" as={Button} colorScheme="pink">
        <GiCog />
      </MenuButton>
      <MenuList>
        <MenuGroup title="Stats">
          <MyMenuItem
            rightIcon={GiLightBulb}
            rightIconText={points}
            iconColor="yellow.400"
          >
            Score
          </MyMenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Instellingen">
          <MyMenuItem
            onClick={() => setLevel('hours')}
            rightIcon={level === 'hours' ? GiCheckMark : null}
          >
            Uren
          </MyMenuItem>
          <MyMenuItem
            onClick={() => setLevel('half')}
            rightIcon={level === 'half' ? GiCheckMark : null}
          >
            Halfuren
          </MyMenuItem>
          <MyMenuItem
            onClick={() => setLevel('15min')}
            rightIcon={level === '15min' ? GiCheckMark : null}
          >
            Kwartieren
          </MyMenuItem>
          <MyMenuItem
            onClick={() => setLevel('minutes')}
            rightIcon={level === 'minutes' ? GiCheckMark : null}
          >
            Minuten
          </MyMenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}

export default Settings

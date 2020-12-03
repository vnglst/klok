import { Box, Flex, MenuItem, MenuItemProps, Text } from '@chakra-ui/react'
import { default as React, FC } from 'react'
import { IconType } from 'react-icons/lib'

export interface MyMenuItemProps extends MenuItemProps {
  rightIcon: IconType | null
  rightIconText?: string | number
  iconColor?: string
}

const MyMenuItem: FC<MyMenuItemProps> = ({
  children,
  rightIcon,
  rightIconText,
  iconColor,
  ...rest
}) => {
  return (
    <MenuItem display="flex" justifyContent="space-between" {...rest}>
      {children}
      {rightIcon && (
        <Flex alignItems="center" fontSize="xs" textColor="gray.800">
          <Box as={rightIcon} color={iconColor || 'gray.800'} />
          <Text ml={2}>{rightIconText}</Text>
        </Flex>
      )}
    </MenuItem>
  )
}

export default MyMenuItem

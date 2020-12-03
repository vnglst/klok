import React, { FC } from 'react'
import styles from './Button.module.css'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

const Button: FC<ButtonProps> = ({ children, className, ...other }) => {
  let cx = styles['default-button']
  if (className) cx += ' ' + className
  return (
    <button type="button" className={cx} {...other}>
      {children}
    </button>
  )
}

export default Button

import React from 'react'
import cn from "classnames";
import styles from './Button.module.scss';

const Button = ({onClick, children,preferences,classNames}) => {
  return (
    <button onClick={onClick} className={cn(styles.product_btn, styles?.[preferences],classNames)}>{children}</button>
  )
}
export default Button
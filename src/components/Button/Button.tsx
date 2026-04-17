import React from 'react';
import cn from "classnames";
import styles from './Button.module.scss';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  preferences?: string;
  classNames?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, preferences, classNames }) => {
  return (
    <button 
      onClick={onClick} 
      className={cn(styles.product_btn, preferences && styles[preferences], classNames)}
    >
      {children}
    </button>
  );
};

export default Button;
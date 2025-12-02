"use client";

import React from 'react';
import styles from './Button.module.css';

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Button({ children, onClick, className = '', type = 'button', disabled = false }: Props) {
  return (
    <button
      type={type}
      className={[styles.button, className].filter(Boolean).join(' ')}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

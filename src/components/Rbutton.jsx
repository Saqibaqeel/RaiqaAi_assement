import React from 'react'
import colors from '../constant/color'

export default function RButton({
  title,
  onClick,
  disabled = false,
  variant = 'primary',
  style = {},
}) {
  const baseStyle = {
    padding: '10px 14px',
    borderRadius: '8px',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    opacity: disabled ? 0.6 : 1,
    transition: '0.2s',
  }

  const variants = {
    primary: {
      background: colors.primary,
      color: colors.outline,
    },
    danger: {
      background: colors.danger,
      color: colors.outline,
    },
    success: {
      background: colors.success,
      color: colors.outline,
    },
    outline: {
      background: colors.outline,
      border: `1px solid ${colors.border}`,
      color: colors.textPrimary,
    },
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ ...baseStyle, ...variants[variant], ...style }}
    >
      {title}
    </button>
  )
}
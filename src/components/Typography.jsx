import React from 'react'

export default function Typography({
  children,
  variant = 'body',
  weight = 'normal',
  color = '#000',
  align = 'left',
  style = {},
}) {
  const Tag =
    variant === 'h1'
      ? 'h1'
      : variant === 'h2'
      ? 'h2'
      : variant === 'h3'
      ? 'h3'
      : 'p'

  const baseStyle = {
    margin: '6px 0',
    fontWeight: weight,
    color,
    textAlign: align,
  }

  return <Tag style={{ ...baseStyle, ...style }}>{children}</Tag>
}
import React from 'react'

export default function PaletteFooter({palette}) {
  return (
    <footer className='footer'>
      {palette.paletteName}
      <span className='emoji'>{palette.emoji}</span>
    </footer>
  )
}


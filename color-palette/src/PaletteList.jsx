import React from 'react'
import {Link} from 'react-router-dom'

export default function PaletteList({palettes}) {

    const paletteList = palettes.map(palette => {
        return <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
    })

  return (
    <div>{paletteList}</div>
  )
}


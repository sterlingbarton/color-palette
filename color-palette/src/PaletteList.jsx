import React from 'react'
// import {Link} from 'react-router-dom'
import MiniPalette from './MiniPalette'

export default function PaletteList({palettes}) {

    const paletteList = palettes.map(palette => {
        return <MiniPalette key={palette.paletteName} palette={palette}/>
    })

  return (
    <div>
        {paletteList}
    </div>
  )
}


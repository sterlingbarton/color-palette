import React from 'react'
import {useNavigate, Link} from 'react-router-dom'
import MiniPalette from './MiniPalette'
import './PaletteList.css'

export default function PaletteList({palettes, deletePalette}) {

    const navigate = useNavigate()

    function goToPalette(id) {
        navigate(`/palette/${id}`)
    }

    const paletteList = palettes.map(palette => {
        return <MiniPalette 
                key={palette.paletteName}
                id={palette.id} 
                palette={palette} 
                deletePalette={deletePalette} 
                goToPalette={() => goToPalette(palette.id)}
                />
    })


  return (
    <div className='palette-list-root'>
        <div className='palette-list-container'>
            <nav className='palette-list-nav'>
                <h1>React Colors</h1>
                <Link to='/palette/new'>Create Palette</Link>
            </nav>
            <div className='palette-list-palettes'>
                {paletteList}
            </div>
        </div>
    </div>
  )
}


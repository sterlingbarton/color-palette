import React from 'react'
import {useNavigate, Link} from 'react-router-dom'
import { CSSTransition, TransitionGroup } from "react-transition-group";
import MiniPalette from './MiniPalette'
import './PaletteList.css'

export default function PaletteList({palettes, deletePalette}) {

    const navigate = useNavigate()

    function goToPalette(id) {
        navigate(`/palette/${id}`)
    }

  return (
    <div className='palette-list-root'>
        <div className='palette-list-container'>
            <nav className='palette-list-nav'>
                <h1 className='palette-list-title'>React Colors</h1>
                <Link to='/palette/new'>Create Palette</Link>
            </nav>
            <TransitionGroup className='palette-list-palettes'>
                {palettes.map((palette) => {
                    return <CSSTransition 
                                key={palette.id}
                                timeout={500}
                                classNames='fade'
                                >
                                <MiniPalette 
                                    key={palette.paletteName}
                                    id={palette.id} 
                                    palette={palette} 
                                    deletePalette={deletePalette} 
                                    goToPalette={() => goToPalette(palette.id)}
                                />
                            </CSSTransition>
                })}
            </TransitionGroup>
        </div>
    </div>
  )
}


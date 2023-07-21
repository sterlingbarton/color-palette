import React from 'react'
import {useNavigate, Link} from 'react-router-dom'
import MiniPalette from './MiniPalette'
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
    root: {
        backgroundColor: 'blue',
        height: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    container: {
        width: '50%',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    nav: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
        '& a':{
            color: 'white'
        }
    },
    palettes: {
        boxSizing: 'border-box',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 30%)',
        gridGap: '5%'
    },

})

export default function PaletteList({palettes, deletePalette}) {
    const classes = useStyles()

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
    <div className={classes.root}>
        <div className={classes.container}>
            <nav className={classes.nav}>
                <h1>React Colors</h1>
                <Link to='/palette/new'>Create Palette</Link>
            </nav>
            <div className={classes.palettes}>
                {paletteList}
            </div>
        </div>
    </div>
  )
}


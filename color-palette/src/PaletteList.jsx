import React from 'react'
import MiniPalette from './MiniPalette'
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
    root: {
        backgroundColor: 'blue',
        height: '100%',
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
        color: 'white'
    },
    palettes: {
        boxSizing: 'border-box',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 30%)',
        gridGap: '5%'
    },

})

export default function PaletteList({palettes}) {
    const classes = useStyles()

    const paletteList = palettes.map(palette => {
        return <MiniPalette key={palette.paletteName} palette={palette}/>
    })

  return (
    <div className={classes.root}>
        <div className={classes.container}>
            <nav className={classes.nav}>
                <h1>React Colors</h1>
            </nav>
            <div className={classes.palettes}>
                {paletteList}
            </div>
        </div>
    </div>
  )
}

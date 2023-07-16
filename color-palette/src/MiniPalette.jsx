import React from 'react'
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
    root: {
        backgroundColor: 'white',
        border: '1px solid black',
        borderRadius: '5',
        padding: '.5rem',
        position: 'relative',
        overflow: 'hidden', 
        '&:hover': {
            cursor: 'pointer',
        }
    },
    colors: {
        backgroundColor: 'grey'
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 0,
        color: 'black',
        paddingTop: '.5rem',
        fontSize: '1rem',
        position: 'relative'
    },
    emoji: {
        marginLeft: '.5rem',
        fontSize: '1.5rem'
    }
})

export default function MiniPalette({palette}) {
    const classes = useStyles()
  return (
    <div className={classes.root}>
        <div className={classes.colors}/>
        <h5 className={classes.title}>{palette.paletteName}<span className={classes.emoji}>{palette.emoji}</span></h5>
    </div>
  )
}


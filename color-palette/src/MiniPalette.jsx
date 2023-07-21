import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
    root: {
        backgroundColor: 'white',
        border: '1px solid black',
        borderRadius: '5px',
        padding: '.5rem',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        '&:hover svg':{
            opacity: 1
        }
    },
    colors: {
        backgroundColor: '#dae1ef',
        height: '150px',
        width: '100%',
        borderRadius: '5px',
        overflow: 'hidden',
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 0,
        color: 'black',
        paddingTop: '.5rem',
        paddingBottom: '1.5rem',
        fontSize: '1rem',
        position: 'relative',
    },
    emoji: {
        marginLeft: '.5rem',
        fontSize: '1.5rem',
    },
    miniColor: {
        height: '25%',
        width: '20%',
        display: 'inline-block',
        margin: '0 auto',
        position: 'relative',
        marginBottom: '-3.5px'
    },
    deleteIcon:{
        color: 'white',
        backgroundColor: '#eb3d30',
        width: '20px',
        height: '20px',
        position: 'absolute',
        right: 0,
        top: 0,
        padding: '10px',
        zIndex: '10',
        opacity: 0,
        
    }
})

export default function MiniPalette({palette, goToPalette, deletePalette, id}) {

    const classes = useStyles()

    const miniColors = palette.colors.map((color) => {
        return <div className={classes.miniColor} style={{ backgroundColor: color.color }} key={color.name}/>
    })

    const handleDeletePalette = (e) => {
        e.stopPropagation()
        deletePalette(id)
    }


  return (
    <div className={classes.root} onClick={goToPalette}>
        <DeleteIcon className={classes.deleteIcon} style={{transition: 'all 0.3s ease-in-out'}} onClick={handleDeletePalette}/>
        <div className={classes.colors}>
            {miniColors}
        </div>
        <h5 className={classes.title}>{palette.paletteName}<span className={classes.emoji}>{palette.emoji}</span></h5>
    </div>
  )
}


import React, {PureComponent} from 'react'
import './MiniPalette.css'
import DeleteIcon from '@mui/icons-material/Delete';

function MiniPalette({
    palette, 
    goToPalette, 
    id, 
    openDialog
}) {

    const miniColors = palette.colors.map((color) => {
        return <div className='mini-palette-miniColor' style={{ backgroundColor: color.color }} key={color.name}/>
    })

    const handleDeletePalette = (e) => {
        e.stopPropagation()
        openDialog(id)
    }
    console.log(palette.paletteName)

  return (
    <div className='mini-palette-root' onClick={() => goToPalette(id)}>
        <DeleteIcon 
            className='mini-palette-delete-icon' 
            style={{ transition: 'all 0.3s ease-in-out' }} 
            onClick={handleDeletePalette}/>
        <div className='mini-palette-colors'>
            {miniColors}
        </div>
        <h5 className='mini-palette-title'>{palette.paletteName}<span className='mini-palette-emoji'>{palette.emoji}</span></h5>
    </div>
  )
}

export default React.memo(MiniPalette, () => true);



import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import './DraggableColorBox.css'

export default function DraggableColorBox({color, name, handleRemoveColor}) {
    return (
    <div className='root' style={{backgroundColor:color}}>
        <div className='box-content'>
            <span>{name}</span>
            <DeleteIcon className='delete-icon' onClick={handleRemoveColor}/>
        </div>
    </div>
  )
}


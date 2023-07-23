import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import chroma from "chroma-js";
import './styles/DraggableColorBox.css'

export default function DraggableColorBox({color, name, handleRemoveColor}) {
    const isDarkColor = chroma(color).luminance() <= 0.08;

    return (
    <div className='color-box-root' style={{ backgroundColor: color }}>
        <div className='box-content'>
            <span className={isDarkColor ? "light-text" : ""}>{name}</span>
            <DeleteIcon className='delete-icon' onClick={handleRemoveColor}/>
        </div>
    </div>
  )
}


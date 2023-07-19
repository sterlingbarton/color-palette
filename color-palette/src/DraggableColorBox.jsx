import React from 'react'
import './DraggableColorBox.css'

export default function DraggableColorBox({color}) {
  return (
    <div className='root' style={{backgroundColor:color}}>{color}</div>
  )
}


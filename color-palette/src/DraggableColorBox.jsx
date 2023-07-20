import React from 'react'
import './DraggableColorBox.css'

export default function DraggableColorBox({color, name}) {
  return (
    <div className='root' style={{backgroundColor:color}}>{name}</div>
  )
}


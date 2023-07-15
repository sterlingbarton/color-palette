import React from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css'


export default function Navbar({level, changeLevel}) {
  return (
    <header className='navbar'>
        <div className='logo'>
            <a href='#'>reactcolorpicker</a>
        </div>
        <div className='slider-container'>
            <span>Level: {level}</span>
            <div className='slider'>
                <Slider min={100} max={900} step={100} value={level} onChange={changeLevel}/>
            </div>
        </div>
    </header>
  )
}


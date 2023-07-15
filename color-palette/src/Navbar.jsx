import {useState} from 'react'
import Slider from 'rc-slider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import 'rc-slider/assets/index.css';
import './Navbar.css'


export default function Navbar({level, changeLevel, format, setFormat, changeFormat}) {
    function handleChange(e){
        setFormat(e.target.value)
        changeFormat(e.target.value)
    }

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
        <div className='select-container'>
            <FormControl fullwidth>
                <InputLabel id="demo-simple-select-label">Format</InputLabel>
                <Select
                labelId="select-label"
                id="format-select"
                value={format}
                label="format"
                onChange={handleChange}
                >
                <MenuItem value='hex'>HEX - #ffffff</MenuItem>
                <MenuItem value='rgb'>RGB - rgb(255,255,255)</MenuItem>
                <MenuItem value='rgba'>RGBA - rgba(255,255,255,1.0)</MenuItem>
                </Select>
            </FormControl>
        </div>
    </header>
  )
}


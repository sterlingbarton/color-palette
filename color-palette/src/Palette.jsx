import {useState} from 'react'
import ColorBox from "./ColorBox"
import './Palette.css'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function Palette({palette}) {
    const [level, setLevel] = useState(500)
    const colorBoxes = palette.colors[level].map((color) => {
        return <ColorBox key={color.name} background={color.hex} name={color.name}/>
    })

    function changeLevel(level){
        setLevel(level)
    }
  return (
    <div className="palette">
        <Slider min={100} max={900} step={100} value={level} onChange={changeLevel}/>
        {/* Navbar goes here */}
        <div className="palette-colors">
            {colorBoxes}
        </div>
        {/* footer */}
    </div>
  )
}


import {useState} from 'react'
import ColorBox from "./ColorBox"
import Navbar from './Navbar'
import './Palette.css'


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
        <Navbar level={level} changeLevel={changeLevel} />
        <div className="palette-colors">
            {colorBoxes}
        </div>
        {/* footer */}
    </div>
  )
}


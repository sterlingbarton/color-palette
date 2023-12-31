import React from 'react'
import ColorBox from "./ColorBox"
import Navbar from './Navbar'
import PaletteFooter from './PaletteFooter'
import './styles/Palette.css'


export default function Palette({palette}) {
    const [level, setLevel] = React.useState(500)
    const [format, setFormat] = React.useState('hex')

    const colorBoxes = palette.colors[level].map((color) => {
        return <ColorBox key={color.id} background={color[format]} name={color.name} colorId={color.id} paletteId={palette.id} showLink={true}/>
    })

    function changeFormat(value){
        setFormat(value)
    }

    function changeLevel(level){
        setLevel(level)
    }

  return (
    <div className="palette">
        <Navbar level={level} changeLevel={changeLevel} format={format} changeFormat={changeFormat} showSlider={true}/>
        <div className="palette-colors">
            {colorBoxes}
        </div>
        <PaletteFooter palette={palette}/>
    </div>
  )
}


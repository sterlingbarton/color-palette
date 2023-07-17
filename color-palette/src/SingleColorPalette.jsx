import {useState} from 'react'
import Navbar from './Navbar'
import ColorBox from './ColorBox'
import PaletteFooter from './PaletteFooter'

export default function SingleColorPalette({palette, colorId}) {
    const [format, setFormat] = useState('hex')

    function gatherShades(palette, colorToFilterBy){
        let shades = []
        let allColors = palette.colors
        for (let key in allColors){
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            )
        }
        return (shades.slice(1))
    }

    let _shades = gatherShades(palette, colorId)

    const colorBoxes = _shades.map((color) => {
        return <ColorBox key={color.name} name={color.name} background={color[format]} showLink={false}/>
    })

    function changeFormat(value){
        setFormat(value)
    }

  return (  
      <div className='palette'>
        <Navbar changeFormat={changeFormat} showSlider={false}/>
        <div className='palette-colors'>
            {colorBoxes}
        </div>
        <PaletteFooter palette={palette}/>
      </div>
    )
}

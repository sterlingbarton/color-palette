import {useState} from 'react'
import ColorBox from './ColorBox'

export default function SingleColorPalette({palette, colorId}) {

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
        return <ColorBox key={color.name} name={color.name} background={color.hex} showLink={false}/>
    })
  return (  
      <div className='palette'>
        <h1>Single Color Palette</h1>
        <div className='palette-colors'>
            {colorBoxes}
        </div>
      </div>
    )
}

import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Navbar from './Navbar'
import ColorBox from './ColorBox'
import PaletteFooter from './PaletteFooter'
import './ColorBox.css'

export default function SingleColorPalette({palette, colorId}) {
    const [format, setFormat] = useState('hex')

    const navigate = useNavigate();

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
      <div className='single-color-palette palette'>
        <Navbar changeFormat={changeFormat} format={format} showSlider={false}/>
        <div className='palette-colors'>
            {colorBoxes}
            <div className='go-back color-box'>
                <button onClick={() => navigate(-1)} className="back-button">
                    Go Back
                </button>
            </div>
        </div>
        <PaletteFooter palette={palette}/>
      </div>
    )
}

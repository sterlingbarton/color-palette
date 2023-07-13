
import ColorBox from "./ColorBox"
import './Palette.css'

export default function Palette({SeedColors}) {
    // const colors = SeedColors[4].colors
    const colorBoxes = SeedColors[4].colors.map((color) => {
        return <ColorBox key={color.name} background={color.color} name={color.name}/>
    })
  return (
    <div className="palette">
        {/* Navbar goes here */}
        <div className="palette-colors">
            {colorBoxes}
        </div>
        {/* footer */}
    </div>
  )
}


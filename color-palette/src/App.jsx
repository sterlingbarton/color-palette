import Palette from "./Palette"
import SeedColors from "./SeedColors"
import { generatePalette } from "./colorHelpers"

export default function App() {
  console.log(generatePalette(SeedColors[4]))
  return (
      <Palette palette={generatePalette(SeedColors[4])}/>
  )
}



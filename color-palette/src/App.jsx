import {useState} from 'react';
import { Routes, Route, useParams } from "react-router-dom";
import Palette from "./Palette"
import SeedColors from "./SeedColors"
import PaletteList from "./PaletteList";
import { generatePalette } from "./colorHelpers"

export default function App() {
  const [palettes, setPalettes] = useState(SeedColors)

  const findPalette = id => palettes.find(palette => palette.id === id);

  const PaletteWrapper = () => {
    const { id } = useParams();
    const palette = generatePalette(findPalette(id))
    return <Palette palette={palette} />;
  };

  return (
    <div className='App'>
      <Routes>
        <Route index path='/' element={<PaletteList palettes={palettes}/>}/>
        <Route exact path='/palette/:id' element={<PaletteWrapper />}/>
    </Routes>
    </div>
  )
}



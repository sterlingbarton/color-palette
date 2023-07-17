import {useState} from 'react';
import { Routes, Route, useParams } from "react-router-dom";
import Palette from "./Palette"
import SeedColors from "./SeedColors"
import PaletteList from "./PaletteList";
import SingleColorPalette from './SingleColorPalette';
import { generatePalette } from "./colorHelpers"

export default function App() {
  const [palettes, setPalettes] = useState(SeedColors)

  const findPalette = id => palettes.find(palette => palette.id === id);

  const PaletteWrapper = () => {
    const { id } = useParams();
    const palette = generatePalette(findPalette(id))
    return <Palette palette={palette} />;
  };

  const SingleColorWrapper = () => {
    const { paletteId, colorId } = useParams();
    const palette = generatePalette(findPalette(paletteId));
    return <SingleColorPalette palette={palette} colorId={colorId} />;
};

  return (
    <div className='App'>
      <Routes>
        <Route index path='/' element={<PaletteList palettes={palettes}/>}/>
        <Route exact path='/palette/:id' element={<PaletteWrapper />}/>
        <Route exact path='/palette/:paletteId/:colorId' element={<SingleColorWrapper />}/>
      </Routes>
    </div>
  )
}



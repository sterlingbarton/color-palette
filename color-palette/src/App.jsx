import React from 'react';
import { Routes, Route, useParams } from "react-router-dom";
import Palette from "./Palette"
import SeedColors from "./SeedColors"
import PaletteList from "./PaletteList";
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import { generatePalette } from "./colorHelpers"

export default function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"))
  const [palettes, setPalettes] = React.useState(savedPalettes || SeedColors)

  const findPalette = id => palettes.find(palette => palette.id === id);

  React.useEffect(() => {
    window.localStorage.setItem('palettes', JSON.stringify(palettes))
  }, [palettes])

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

  const savePalette = (newPalette) => {
    setPalettes(palettes.concat(newPalette)); 
  }

  return (
    <div className='App'>
      <Routes>
        <Route index path='/' element={<PaletteList palettes={palettes}/>}/>
        <Route exact path='/palette/new' element={<NewPaletteForm savePalette={savePalette} palettes={palettes}/>}/>
        <Route exact path='/palette/:id' element={<PaletteWrapper />}/>
        <Route exact path='/palette/:paletteId/:colorId' element={<SingleColorWrapper />}/>
      </Routes>
    </div>
  )
}



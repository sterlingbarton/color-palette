import React from 'react';
import { Routes, Route, useParams, useLocation } from "react-router-dom";
import Palette from "./Palette"
import SeedColors from "./SeedColors"
import PaletteList from "./PaletteList";
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import { generatePalette } from "./colorHelpers"
import { TransitionGroup, CSSTransition } from "react-transition-group";
import './App.css'


export default function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"))
  const [palettes, setPalettes] = React.useState(savedPalettes || SeedColors)

  React.useEffect(() => {
    window.localStorage.setItem('palettes', JSON.stringify(palettes))
  }, [palettes])

  const location = useLocation();

  const findPalette = id => palettes.find(palette => palette.id === id);

  const deletePalette = id => setPalettes(palettes.filter((palette) => palette.id !== id));

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
    <TransitionGroup className='App' location={location}>
      <CSSTransition key={location.key} classNames='fade' timeout={500}>
        <Routes location={location}>
          <Route 
            index 
            path='/' 
            element={
              <div className='page'>
                <PaletteList palettes={palettes} deletePalette={deletePalette}/>
              </div>
            }
            />
          <Route 
            exact 
            path='/palette/new' 
            element={
              <div className='page'>
                <NewPaletteForm savePalette={savePalette} palettes={palettes}/>
              </div>
            }
            />
          <Route 
            exact 
            path='/palette/:id' 
            element={
              <div className='page'>
                <PaletteWrapper />
              </div>
            }
            />
          <Route 
            exact 
            path='/palette/:paletteId/:colorId' 
            element={
              <div className='page'>
                <SingleColorWrapper />
              </div>
            }
            />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  )
}



import React from 'react';
import { Routes, Route, useParams, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Palette from "./Palette"
import SeedColors from "./SeedColors"
import PaletteList from "./PaletteList";
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import { generatePalette } from "./colorHelpers"
import Page from './Page';
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
              <Page>
                <PaletteList palettes={palettes} deletePalette={deletePalette}/>
              </Page>
            }
            />
          <Route 
            exact 
            path='/palette/new' 
            element={
              <Page>
                <NewPaletteForm savePalette={savePalette} palettes={palettes}/>
              </Page>
            }
            />
          <Route 
            exact 
            path='/palette/:id' 
            element={
              <Page>
                <PaletteWrapper />
              </Page>
            }
            />
          <Route 
            exact 
            path='/palette/:paletteId/:colorId' 
            element={
              <Page>
                <SingleColorWrapper />
              </Page>
            }
            />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  )
}



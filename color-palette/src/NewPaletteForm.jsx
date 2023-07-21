import React from 'react'
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DraggableColorList from "./DraggableColorList";
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import './NewPaletteForm.css'

export const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function NewPaletteForm({savePalette, palettes}) {
    const defaultProps = {
        maxColors: 20
    }

    const navigate = useNavigate();

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [colors, setColors] = React.useState(palettes[0].colors)
    const [newPaletteName, setNewPaletteName] = React.useState("");


    const handleDrawerOpen = () => {
    setOpen(true);
    };

    const handleDrawerClose = () => {
    setOpen(false);
    };

    function handleSavePalette(newPalette){
        // e.preventDefault()
        newPalette.id = newPaletteName.toLowerCase().replace(/ /g, "-")
        newPalette.colors = colors
        savePalette(newPalette);
        navigate("/");
    }

    function handleRemoveColor(colorName){
        setColors(colors.filter((color) => color.name !== colorName))
    }

    function clearColors(){
        setColors([]);
    }

    function addRandomColor(){
        const allColors = palettes.map((p) => p.colors).flat();
        let rand = Math.floor(Math.random() * allColors.length);
        const randomColor = allColors[rand];
        setColors(colors.concat(randomColor));
    }

    const paletteIsFull = colors.length >= defaultProps.maxColors;

    return (
        <Box>
            <PaletteFormNav 
                open={open}
                palettes={palettes}
                handleDrawerOpen={handleDrawerOpen}
                handleSavePalette={handleSavePalette}
                newPaletteName={newPaletteName}
                setNewPaletteName={setNewPaletteName}

            />
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    display: 'flex',
                    alignItems: 'center',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
                >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <div className='container'>
                    <Typography variant='h4' gutterBottom>Design Your Palette</Typography>
                    <ButtonGroup>
                        <Button variant='contained' color='secondary' onClick={clearColors}>Clear Palette</Button>
                        <Button 
                            variant='contained' 
                            color='primary'
                            disabled={paletteIsFull}  
                            onClick={addRandomColor}>Random Color</Button>
                    </ButtonGroup>
                <ColorPickerForm paletteIsFull={paletteIsFull} colors={colors} setColors={setColors}/>
                </div>
            </Drawer>
            <Main open={open} sx={{height: 'calc(100vh - 64px)'}}>
            <DrawerHeader />
            <DraggableColorList
                        colors={colors}
                        setColors={setColors}
                        handleRemoveColor={handleRemoveColor}
                    />
            </Main>
        </Box>
    ); 
}


import React from 'react'
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {ChromePicker} from 'react-color'
import DraggableColorList from "./DraggableColorList";


const drawerWidth = 400;

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

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

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
    const [currentColor, setCurrentColor] = React.useState('teal');
    const [colors, setColors] = React.useState(palettes[0].colors)
    const [newColorName, setNewColorName] = React.useState('')
    const [newPaletteName, setNewPaletteName] = React.useState("");

    React.useEffect(() => {
        ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
        return colors.every(
                ({name}) => name.toLowerCase() !== value.toLowerCase()
            )
        });
        ValidatorForm.addValidationRule("isColorUnique", () => {
            return colors.every(
                ({ color }) =>
                    color.toLowerCase() !== currentColor.toLowerCase()
            );
        });
        ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
            return palettes.every(
                ({ paletteName }) =>
                    paletteName.toLowerCase() !== value.toLowerCase()
            )
        });
    })


    const handleDrawerOpen = () => {
    setOpen(true);
    };

    const handleDrawerClose = () => {
    setOpen(false);
    };

    function updateCurrentColor(newColor){
        setCurrentColor(newColor.hex)
    }

    function addNewColor(e){
        e.preventDefault()
        const newColor = {
            color: currentColor,
            name: newColorName
        }
        setColors([...colors, newColor])
    }

    function handleSavePalette(e){
        e.preventDefault()
        const newPalette = {
            paletteName: newPaletteName,
            id: newPaletteName.toLowerCase().replace(/ /g, "-"),
            colors: colors,
        };
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
        console.log(allColors)
        let rand = Math.floor(Math.random() * allColors.length);
        const randomColor = allColors[rand];
        setColors(colors.concat(randomColor));
    }

    const paletteIsFull = colors.length >= defaultProps.maxColors;

    return (
    <Box sx={{ 
        display: 'flex',
        mt: '4rem'
        }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} color='default'>
        <Toolbar>
            <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
            <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
            Persistent drawer
            </Typography>
            <ValidatorForm onSubmit={handleSavePalette}>
                <TextValidator 
                    label='New Palette Name' 
                    value={newPaletteName} 
                    onChange={(e) => setNewPaletteName(e.target.value)}
                    validators={["required", "isPaletteNameUnique"]}
                    errorMessages={["Enter a Palette Name", "Name is already used"]}
                    />
                <Button type='submit' variant='contained' color='primary'>Save Palette</Button>
            </ValidatorForm>
        </Toolbar>
        </AppBar>
        <Drawer
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
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
        <Typography variant='h4'>Design Your Palette</Typography>
        <ButtonGroup>
            <Button variant='contained' color='secondary' onClick={clearColors}>Clear Palette</Button>
            <Button 
                variant='contained' 
                color='primary'
                disabled={paletteIsFull}  
                onClick={addRandomColor}>Random Color</Button>
        </ButtonGroup>
        <ChromePicker color={currentColor} onChangeComplete={updateCurrentColor}/>
        <ValidatorForm onSubmit={addNewColor}>
            <TextValidator 
                label='New Color Name'
                value={newColorName} 
                onChange={(e) => setNewColorName(e.target.value)}
                validators={['required', 'isColorNameUnique', "isColorUnique",]}
                errorMessages={['this field is required', 'This name has already been used', "This color has already been used"]}
            />
            <Button 
                variant='contained' 
                color='primary' 
                type='submit'
                disabled={paletteIsFull} 
                sx={{backgroundColor: currentColor}}>
                    {paletteIsFull ? 'Pallete Full' : 'Add Color'}
                </Button>
        </ValidatorForm>
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


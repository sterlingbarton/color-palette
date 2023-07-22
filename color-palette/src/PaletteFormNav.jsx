import React from 'react'
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { drawerWidth } from './NewPaletteForm';
import PaletteMetaForm from './PaletteMetaForm';
import './PaletteFormNav.css'

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

export default function PaletteFormNav({open, palettes, handleDrawerOpen, handleSavePalette, newPaletteName, setNewPaletteName}) {
    const navigate = useNavigate();

    const [formShowing, setFormShowing] = React.useState(false);

    function showForm(){
        setFormShowing(true)
    }

    function hideForm(){
        setFormShowing(false)
    }
  return (
    <Box sx={{ 
        display: 'flex',
        mt: '4rem',
        }}>
        <CssBaseline />
        <AppBar 
            position="fixed" 
            open={open} 
            color='default' 
            sx={{        
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: 'center',
                height: "64px"}}
            >
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
                Create Palette
            </Typography>
        </Toolbar>
        <div className='navBtns'>
            <Button className='button' variant='contained' color='secondary' onClick={() => navigate(-1)}>
                Go Back
            </Button>
            <Button className='button' variant="contained" color='primary' onClick={showForm}>
                Save Palette
            </Button>
            {formShowing && (
                <PaletteMetaForm 
                    hideForm={hideForm}
                    palettes={palettes} 
                    newPaletteName={newPaletteName}
                    setNewPaletteName={setNewPaletteName}
                    handleSavePalette={handleSavePalette}/>
            )}
        </div>
        </AppBar>
    </Box>
  )
}


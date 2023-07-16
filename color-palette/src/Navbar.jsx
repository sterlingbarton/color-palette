import {useState} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'rc-slider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import 'rc-slider/assets/index.css';
import './Navbar.css'


export default function Navbar({level, changeLevel, format, setFormat, changeFormat}) {

    const [open, setOpen] = useState(false);


    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const action = (
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
      );

    function handleChange(e){
        setFormat(e.target.value)
        changeFormat(e.target.value)
        setOpen(true);
    }

  return (
    <header className='navbar'>
        <div className='logo'>
            <Link to='/'>reactcolorpicker</Link>
        </div>
        <div className='slider-container'>
            <span>Level: {level}</span>
            <div className='slider'>
                <Slider min={100} max={900} step={100} value={level} onChange={changeLevel}/>
            </div>
        </div>
        <div className='select-container'>
            <FormControl fullwidth size="small">
                <InputLabel id="demo-simple-select-label">Format</InputLabel>
                <Select
                labelId="select-label"
                id="format-select"
                value={format}
                label="format"
                onChange={handleChange}
                >
                <MenuItem value='hex'>HEX - #ffffff</MenuItem>
                <MenuItem value='rgb'>RGB - rgb(255,255,255)</MenuItem>
                <MenuItem value='rgba'>RGBA - rgba(255,255,255,1.0)</MenuItem>
                </Select>
            </FormControl>
        </div>
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Format changed"
            action={action}
        />
    </header>
  )
}


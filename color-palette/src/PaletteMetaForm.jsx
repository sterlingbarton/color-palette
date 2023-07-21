import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


export default function PaletteMetaForm({openDialog, setOpenDialog, palettes, newPaletteName, setNewPaletteName, handleSavePalette}) {

    React.useEffect(() => {
        ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
            return palettes.every(
                ({ paletteName }) =>
                    paletteName.toLowerCase() !== value.toLowerCase()
            );
        });
    });

  
    const handleClose = () => {
      setOpenDialog(false);
    };
  
    return (
        <Dialog open={openDialog} onClose={handleClose}>
          <DialogTitle>Choose a palette name</DialogTitle>
          <ValidatorForm onSubmit={handleSavePalette}>
          <DialogContent>
            <DialogContentText>
                Please enter a unique name for your palette
            </DialogContentText>
                    <TextValidator 
                        label='New Palette Name' 
                        value={newPaletteName} 
                        fullWidth
                        margin='normal'
                        onChange={(e) => setNewPaletteName(e.target.value)}
                        validators={["required", "isPaletteNameUnique"]}
                        errorMessages={["Enter a Palette Name", "Name is already used"]}
                        />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit' variant='contained' color='primary'>Save Palette</Button>
          </DialogActions>
          </ValidatorForm>

        </Dialog>
    );
}


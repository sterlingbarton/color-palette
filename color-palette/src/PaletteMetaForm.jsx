import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


export default function PaletteMetaForm({palettes, newPaletteName, setNewPaletteName, handleSavePalette}) {

    React.useEffect(() => {
        ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
            return palettes.every(
                ({ paletteName }) =>
                    paletteName.toLowerCase() !== value.toLowerCase()
            );
        });
    });

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Open form dialog
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We
              will send updates occasionally.
            </DialogContentText>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Subscribe</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}


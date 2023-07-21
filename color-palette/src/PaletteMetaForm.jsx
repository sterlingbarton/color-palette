import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'


export default function PaletteMetaForm({ 
    palettes, 
    newPaletteName, 
    setNewPaletteName, 
    handleSavePalette,
    hideForm
}) {

    // const [open, setOpen] = React.useState(true);
    const [type, setType] = React.useState('form')


    React.useEffect(() => {
        ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
            return palettes.every(
                ({ paletteName }) =>
                    paletteName.toLowerCase() !== value.toLowerCase()
            );
        });
    });

    function showEmojiPicker() {
        setType("emoji");
    };

    function handleEmoji(emoji){
        const newPalette = {
            paletteName: newPaletteName,
            emoji: emoji.native
        }
        handleSavePalette(newPalette)
    }
  
    return (
        <div>
            <Dialog open={type === 'emoji'} onClose={hideForm}>
                <DialogTitle>Choose a Palette Emoji</DialogTitle>
                <Picker data={data} theme='light' title='Choose a Palette Emoji' onEmojiSelect={handleEmoji}/>
            </Dialog>
            <Dialog open={type === 'form'} onClose={hideForm}>
                <DialogTitle>Choose a palette name</DialogTitle>
                <ValidatorForm onSubmit={showEmojiPicker}>
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
                    <Button onClick={hideForm}>Cancel</Button>
                    <Button type='submit' variant='contained' color='primary'>Save Palette</Button>
                </DialogActions>
                </ValidatorForm>
            </Dialog>
        </div>
        
    );
}


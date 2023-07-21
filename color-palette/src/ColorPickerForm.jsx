import React from 'react'
import Button from '@mui/material/Button';
import {ChromePicker} from 'react-color'


export default function ColorPickerForm({paletteIsFull, colors, setColors}) {
    const [currentColor, setCurrentColor] = React.useState('teal');
    const [newColorName, setNewColorName] = React.useState('')

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
    })

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

  return (
    <div>
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
    </div>
  )
}


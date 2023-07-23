import React from 'react'
import Button from '@mui/material/Button';
import {ChromePicker} from 'react-color'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import './styles/ColorPickerForm.css'


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
        setNewColorName('')
    }

  return (
    <div>
         <ChromePicker className='picker' color={currentColor} onChangeComplete={updateCurrentColor}/>
                <ValidatorForm onSubmit={addNewColor} instantValidate={false}>
                    <TextValidator 
                        label='New Color Name'
                        variant='filled'
                        margin='normal'
                        value={newColorName}
                        className='color-name-input' 
                        onChange={(e) => setNewColorName(e.target.value)}
                        validators={['required', 'isColorNameUnique', "isColorUnique",]}
                        errorMessages={['this field is required', 'This name has already been used', "This color has already been used"]}
                    />
                    <Button 
                        variant='contained' 
                        color='primary' 
                        type='submit'
                        disabled={paletteIsFull} 
                        className='add-color'
                        sx={{backgroundColor: currentColor}}>
                            {paletteIsFull ? 'Pallete Full' : 'Add Color'}
                        </Button>
                </ValidatorForm>
    </div>
  )
}


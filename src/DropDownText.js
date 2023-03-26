import React from 'react'

export var text = 'none'

const DropDownText = () => {

    const options = [
    
    { label: 'Select', value: 'none' },

    { label: 'Fruit', value: 'fruit' },
    
    { label: 'Vegetable', value: 'vegetable' },
    
    { label: 'Meat', value: 'meat' },
    
    ];
    
    const [value, setValue] = React.useState('none');
    
    const handleChange = (event) => {
    
        setValue(event.target.value);

        text = event.target.value

        console.log(text)
    
    };
    
    return (
    
    <div>
    
        <label>
    
        What do we eat?
    
        <select value={value} onChange={handleChange}>
    
            {options.map((option) => (
    
            <option value={option.value}>{option.label}</option>
    
            ))}
    
        </select>
    
        </label>
    
        <p>We eat {value}!</p>
    
    </div>
    
    );
     
};
   
export default DropDownText;
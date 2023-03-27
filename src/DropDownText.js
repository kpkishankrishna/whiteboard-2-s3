import React from 'react'

export var text = 'none'

const DropDownText = () => {

    const options = [
    
    { label: 'Select', value: 'none' },
    { label: 'a', value: 'a' },
    { label: 'ai', value: 'ai' },
    { label: 'aa', value: 'aa' },
    { label: 'ia', value: 'ia' },
    { label: 'aaa', value: 'aaa' },
    { label: 'aac', value: 'aac' },
    { label: 'ca', value: 'ca' },
    { label: 'ccc', value: 'ccc' },
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
    
    </div>
    
    );
     
};
   
export default DropDownText;
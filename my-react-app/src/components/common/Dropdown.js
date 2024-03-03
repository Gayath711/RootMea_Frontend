const DropDown = ({ name, id = { name }, placeholder, height = '7vh', isEdittable, value, handleChange }) => {
    const bgDisabled = isEdittable ? 'bg-transparent' : ''
    return (
        <select
            name={name}
            id={id}
            defaultValue=""
            disabled={isEdittable}
            style={{ height: `${height}` }}
            value={value}
            onChange={handleChange}
            className={`w-full px-2 border-1
            border-gray-600/50
            placeholder-gray-500 
            placeholder-opacity-50 
            rounded-md
            text-lg 
            ${bgDisabled}
            text-gray-500/50`}>
            <option value="" disabled hidden>{placeholder}</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
        </select>
    );
}

export default DropDown;
const DropDown = ({ name, id = { name }, placeholder, height = 75, value }) => {
    return (
        <select
            name={name}
            id={id}
            value={value}
            style={{ height }}
            className={`w-full px-2 border-1
            border-gray-600/50
            placeholder-gray-500 
            placeholder-opacity-50 
            rounded-md
            text-lg
            h-[${height}px]
            text-gray-500/50`}>
            <option value="" disabled hidden>{placeholder}</option>
            <option value={value}>{value}</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
        </select>
    );
}

export default DropDown;
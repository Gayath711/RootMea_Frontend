const TextBox = ({ name, id = { name }, placeholder, width = 480, height = '7vh', isEdittable }) => {
    return (
        <input
            name={name}
            id={id}
            disabled={isEdittable}
            placeholder={placeholder}
            style={{ height: '7vh' }}
            className="w-full px-2 border-1
                border-gray-600/50
                placeholder-gray-500 
                placeholder-opacity-50 
                rounded-md
                text-lg"
        />
    );
}

export default TextBox;
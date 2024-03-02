const TextArea = ({ name, id = { name }, placeholder, width = 480, height = 75, isEdittable }) => {
    return (
        <textarea
            name={name}
            id={id}
            disabled={isEdittable}
            placeholder={placeholder}
            style={{ height }}
            className="w-full px-2 border-1
                border-gray-600/50
                placeholder-gray-500 
                placeholder-opacity-50 
                rounded-md
                text-lg"
        />
    );
}

export default TextArea;
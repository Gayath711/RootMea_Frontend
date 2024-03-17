

const PrimaryButton = ({ text, width = 150, height = 50, handleClick, isDisabled }) => {
    return (
        <button
            type="button"
            style={{ width, height }}
            className="border-1 bg-green-800 text-white text-lg rounded-md"
            onClick={handleClick}
            disabled={isDisabled}
        >
            {text}
        </button>
    );
}

export default PrimaryButton;

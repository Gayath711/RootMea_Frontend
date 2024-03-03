import { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import { BsCalendar } from 'react-icons/bs';

const DateInput = ({ name, id = { name }, placeholder, height = '7vh', isEdittable, value, handleChange }) => {
    const [startDate, setStartDate] = useState(null);
    return (
        <DatePicker
            name={name}
            id={id}
            selected={startDate}
            disabled={isEdittable}
            value={value}
            onChange={handleChange}
            // style={{ height: `${height}` }}
            className={`w-full!
            px-2 border-1
                border-gray-600/50
                placeholder-gray-500 
                placeholder-opacity-50 
                rounded-md
                text-lg
                h-[7vh]`}
            placeholderText={placeholder}
        />
    );
}

export default DateInput;
import { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import { BsCalendar } from 'react-icons/bs';
import { format } from 'date-fns'; // Import the format function from date-fns

const DateInput = ({ name, id = { name }, placeholder, height = '7vh', isEdittable, value, handleChange }) => {
    const [startDate, setStartDate] = useState(value || null);

    const handleDateChange = (selectedDate) => {
        const formattedDate = format(selectedDate, 'yyyy-MM-dd'); // Format the date
        console.log("date",formattedDate)
        setStartDate(selectedDate);
        // Perform any additional actions with the selected date if needed
        handleChange(selectedDate);
    };

    return (
        <DatePicker
            name={name}
            id={id}
            selected={startDate}
            disabled={isEdittable}
            value={value}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
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
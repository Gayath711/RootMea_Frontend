import { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import { BsCalendar } from 'react-icons/bs';
import { format } from 'date-fns'; // Import the format function from date-fns

const DateInput = ({ name, id = { name }, placeholder, width = 340, height = '7vh', isEdittable, value, handleChange }) => {
    const [startDate, setStartDate] = useState(value || null);
    const bgDisabled = isEdittable ? '#F6F7F7' : ''
    const bgLabelDisabled = isEdittable ? '#F6F7F7' : 'white'

    const handleDateChange = (selectedDate) => {
        const formattedDate = format(selectedDate, 'yyyy-MM-dd'); // Format the date
        console.log("date", formattedDate)
        setStartDate(selectedDate);
        // Perform any additional actions with the selected date if needed
        handleChange(formattedDate);
    };

    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };
    const styles = {
        "react-datepicker__month-container": {
            backgroundColor: "#ffffff",
        }
    }
    return (
        <div className="relative flex-grow">
            <DatePicker
                name={name}
                id={id}
                selected={startDate}
                disabled={isEdittable}
                value={value}
                onChange={handleDateChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{ width: '100%', minWidth: '10rem' }}
                dateFormat="yyyy-MM-dd"
                // style={{ height: `${height}` }}
                className={`
            px-2 border-1
                border-gray-300/50
                placeholder-gray-500 
                placeholder-opacity-50 
                rounded-md
                text-md
                z-50
                h-[7vh]
                w-[${width}px]`
                }
                placeholderText=" "
            // style={styles["react-datepicker__month-container"]}
            />

            <label
                htmlFor={id}
                className={`absolute px-2 text-sm text-gray-500 duration-300 transform ${isFocused || value ? '-translate-y-6 scale-75 top-4' : 'translate-y-1/2 scale-100 top-1.5'} z-10 origin-[0] start-2.5 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`}
                style={{ background: bgLabelDisabled }}
            >
                {placeholder}
            </label>
        </div>
    );
}

export default DateInput;
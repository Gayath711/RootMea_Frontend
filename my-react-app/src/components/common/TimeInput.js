import { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TimeInput = ({ name, id, placeholder, width = 340, height = '7vh', isEdittable, value, handleChange, timeIntervals, register }) => {
    // const [selectedTime, setSelectedTime] = useState(value || null);
    const bgLabelDisabled = isEdittable ? '#F6F7F7' : 'white'

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
    };
    const [selectedTime, setSelectedTime] = useState(null);

    if (!register) {
        console.log("inside register")
        register = () => { }
    }
    console.log("name", name)
    return (
        <div className="relative flex-grow">
            <DatePicker
                name={name}
                id={id || name}
                // selected={selectedTime}
                onFocus={handleFocus}
                onBlur={handleBlur}
                disabled={isEdittable}
                value={value}
                onChange={handleChange}
                style={{ width: '100%', minWidth: '10rem' }}
                showTimeSelect
                showTimeSelectOnly
                dateFormat="h:mm aa"
                timeIntervals={timeIntervals}
                className={`
                bg-white
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
                selected={value}
            // onChange={date => setSelectedTime(date)}
            // {...register(name)}
            />

            <label
                htmlFor={id}
                className={`absolute px-2 text-sm text-gray-500 duration-300 transform ${isFocused || value ? '-translate-y-6 scale-75 top-4' : 'translate-y-1/2 scale-100 top-1.5'} z-0 origin-[0] start-2.5 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`}
                style={{ background: bgLabelDisabled }}
            >
                {placeholder}
            </label>
        </div>
    );
}

export default TimeInput;
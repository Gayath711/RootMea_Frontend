const CalendarHeader = () => {
    return (
        <div className="flex flex-row bg-white justify-between items-start">
            <div className="flex flex-row p-2 space-x-5">
                <p className="text-xs">Today</p>
                <p className="text-xs">Week</p>
                <p className="border-b-2 border-teal-600 text-teal-600 text-xs">Month</p>
                <p className="text-xs">Year</p>
            </div>
            <div className="flex flex-row space-x-3 p-2 rounded shadow-sm w-fit">
                <div className="text-center text-teal-600 text-xs">March</div>
                <div className="text-center text-teal-600 text-xs">2024</div>
            </div>
        </div>

    );
}

export default CalendarHeader;
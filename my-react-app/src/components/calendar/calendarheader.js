import dayjs from "dayjs";

const CalendarHeader = ({
  viewList,
  currentCalendarView,
  handleCalendarView,
}) => {
  return (
    <div className="flex flex-row bg-white justify-between items-start">
      <div className="flex flex-row p-2 space-x-5">
        {viewList.map((view, idx) => {
          return (
            <p
              key={view + idx}
              onClick={() => handleCalendarView(view)}
              className={`${
                view === currentCalendarView
                  ? "border-b-2 border-teal-600 text-teal-600 text-xs"
                  : "text-xs"
              }
                   cursor-pointer`}
            >
              {view}
            </p>
          );
        })}
      </div>
      <div className="flex flex-row space-x-3 p-2 rounded shadow-sm w-fit">
        <div className="text-center text-teal-600 text-xs">
          {dayjs().format("MMMM")}
        </div>
        <div className="text-center text-teal-600 text-xs">
          {dayjs().year()}
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;

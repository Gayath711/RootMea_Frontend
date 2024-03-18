import React from "react";
import Day from "./day";
export default function Month({ month, savedEvents }) {
    return (
        <div className="flex-1 grid grid-cols-7 grid-rows-6 gap-0">
            {month.map((row, i) => (
                <React.Fragment key={i}>
                    {row.map((day, idx) => (
                        <Day day={day} key={idx} rowIdx={i} savedEvents={savedEvents} />
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
}
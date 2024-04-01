import React from "react";
import Day from "./day";

export default function Week({ week, savedEvents }) {
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-6 gap-0">
      {week.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} savedEvents={savedEvents} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

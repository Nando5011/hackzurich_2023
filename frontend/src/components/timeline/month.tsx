import React from "react";
import DayTimeline from "./day";

const MonthTimeline = ({ month, statRecObject }) => {
  return (
    <div className="timeline-month">
      <div className="timeline-month-title">
        <span>{month}</span>
      </div>

      {Object.keys(statRecObject).map((day) => (
        <DayTimeline key={day} day={day} statRecObject={statRecObject[day]} />
      ))}
    </div>
  );
};

export default MonthTimeline;

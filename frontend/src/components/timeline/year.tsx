import React from "react";
import MonthTimeline from "./month";

const YearTimeline = ({ year, statRecObject }) => {
  return (
    <div className="timeline-year">
      <div className="timeline-year-title">
        <span>{year}</span>
      </div>
      {Object.keys(statRecObject).map((month) => (
        <MonthTimeline
          key={month}
          month={month}
          statRecObject={statRecObject[month]}
        />
      ))}
    </div>
  );
};

export default YearTimeline;

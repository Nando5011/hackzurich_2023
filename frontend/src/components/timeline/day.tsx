import React from "react";

const DayTimeline = ({ day, statRecObject }) => {
  return (
    <div className="timeline-item">
      <div className="timeline-item-date">{day}</div>
      <div className="timeline-item-content">
        {statRecObject.map((val) => (
          <>
            <div key={val.timestamp} className="timeline-item-time">
              {val.timestamp}
            </div>
            <div key={val.task} className="timeline-item-text">
              {val.task}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default DayTimeline;

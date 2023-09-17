import React from "react";

const DayTimeline = ({ day, statRecObject }) => {
    return (
    <div className="timeline-item">
      <div className="timeline-item-date">{day}</div>
      <div className="timeline-item-content">
        {statRecObject["timestamps"].map((val, index) => (
          <React.Fragment key={index}>
            <div className="timeline-item-time">
              {val.timestamp}
            </div>
            <div className="timeline-item-text">
              {val.task}
            </div>
            </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default DayTimeline;

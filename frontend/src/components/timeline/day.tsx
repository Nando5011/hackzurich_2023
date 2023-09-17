import React from "react";

const DayTimeline = ({ day, statRecObject }) => {
  const getNameOfTask = (taskPath: string) => {
    const pathArray = taskPath.split("/");

    if (pathArray.length >= 2) {
      const lastString = pathArray[pathArray.length - 1];
      const secondToLastString = pathArray[pathArray.length - 2];
      return `${lastString} (${secondToLastString})`;
    } else {
      return pathArray[-1];
    }
  };
  return (
    <div className="timeline-item">
      <div className="timeline-item-date">{day}</div>
      <div className="timeline-item-content">
        {statRecObject["timestamps"].map((val, index) => (
          <React.Fragment key={index}>
            <div className="timeline-item-time">{val.timestamp}</div>
            <div className="timeline-item-text">{getNameOfTask(val.task)}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default DayTimeline;

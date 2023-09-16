import React from "react";
import TimeSeriesGraph from "../components/plots/TimeSeriesGraph";
import TaskTypeDistributionGraph from "../components/plots/TaskTypeDistributionGraph";
import { BlockTitle, Link, NavRight, NavTitle, Navbar } from "framework7-react";

const StatsPage = () => {
  return (
    <div className="page">
      <Navbar>
        <NavTitle>BreakWise</NavTitle>
        <NavRight>
          <Link back>Go Back</Link>
        </NavRight>
      </Navbar>
      <div className="page-content">
        <BlockTitle>Statistics</BlockTitle>
        <TaskTypeDistributionGraph />
        <TimeSeriesGraph />
      </div>
    </div>
  );
};

export default StatsPage;

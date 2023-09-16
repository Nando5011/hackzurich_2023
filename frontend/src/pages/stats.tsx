import React from 'react';
import TimeSeriesGraph from '../components/plots/TimeSeriesGraph';
import TaskTypeDistributionGraph from '../components/plots/TaskTypeDistributionGraph';
//import { statMatrix } from '../components/statistic-view/statistic-view';

const StatsPage = ({ statMatrix }) => {
  return (
    <div className="page">
      <div className="navbar">
        <div className="navbar-inner">
          <div className="title">Stats</div>
        </div>
      </div>
      <div className="page-content">
        <TaskTypeDistributionGraph statMatrix={statMatrix} />
        <TimeSeriesGraph statMatrix={statMatrix} />
      </div>
    </div>
  );
};

export default StatsPage;

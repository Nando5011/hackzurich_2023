import TaskTypeDistributionGraph from "../components/plots/TaskTypeDistributionGraph.jsx";
import TimeSeriesGraph from "../components/plots/TimeSeriesGraph.jsx";
import HomePage from "../pages/home.tsx";
import StatsPage from "../pages/stats.tsx";

var routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/time-series",
    component: TimeSeriesGraph,
  },
  {
    path: "/distribution-graph",
    component: TaskTypeDistributionGraph,
  },
  { path: "/stats", component: StatsPage },
];

export default routes;

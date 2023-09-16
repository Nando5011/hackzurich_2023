import HomePage from "../pages/home.tsx";
import StatsPage from "../pages/stats.tsx"

var routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/stats",
    component: StatsPage,
  },
];

export default routes;

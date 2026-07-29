import { createBrowserRouter } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";

import Dashboard from "../pages/Overview";
import Drivers from "../pages/Drivers";
import Constructors from "../pages/Constructors";
import Compare from "../pages/Compare";
import DriverPage from "../pages/DriverPage";


export const router = createBrowserRouter([
  {
    element: <AppLayout />,

    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/drivers",
        element: <Drivers />,
      },
      {
        path: "/constructors",
        element: <Constructors />,
      },
      {
        path: "/compare",
        element: <Compare />,
      },
      {
    path: "/drivers/:driverId",
    element: <DriverPage />,
}
    ],
  },
]);
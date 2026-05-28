import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import LandingPage from "../views/LandingPage";
import Projects from "../Projects";
import Team from "../views/Team";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children : [
        {
            index: true,
            path: '/',
            Component: LandingPage
        },
        {
          path:'/projects',
          Component: Projects
        },
        {
          path:'/team',
          Component: Team
        }
    ]
  },
]);

export default router;
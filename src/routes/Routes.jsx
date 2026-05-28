import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import LandingPage from "../views/LandingPage";
import Projects from "../Projects";
import Team from "../views/Team";
import About from "../views/About";
import Blog from "../views/Blog";
import ProjectDetails from "../views/ProjectDetails";

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
          path:'/project-details/:id',
          loader: ()=>fetch(`data.json`),
          Component: ProjectDetails

        },
        {
          path:'/team',
          Component: Team
        },
        {
          path:'/about',
          Component: About
        },
        {
          path:'/blog',
          Component: Blog
        }
    ]
  },
]);

export default router;
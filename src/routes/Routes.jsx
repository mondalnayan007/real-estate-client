import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import LandingPage from "../views/LandingPage";
import Projects from "../Projects";
import Team from "../views/Team";
import About from "../views/About";
import Blog from "../views/Blog";
import ProjectDetails from "../views/ProjectDetails";
import UserSignup from "../views/UserSignup";
import UserLogin from "../views/UserLogin"
import AdminLogin from "../views/AdminLogin"
import Dashboard from "../views/Dashboard"

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
          loader: async () => {
            const res = await fetch('/data.json');
            return res.ok ? res.json() : [];
          },
          Component: ProjectDetails,
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
        },
        {
          path:'/signup',
          Component: UserSignup
        },
        {
          path:'/login',
          Component: UserLogin
        }
    ]
  },
  {
    path: '/admin/login',
    Component: AdminLogin
  },
  {
    path: '/admin/dashboard',
    Component: Dashboard
  }
]);

export default router;
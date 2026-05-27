import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import LandingPage from "../views/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children : [
        {
            index: true,
            path: '/',
            Component: LandingPage
        }
    ]
  },
]);

export default router;
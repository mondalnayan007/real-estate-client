import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import LandingPage from "../views/LandingPage"; // এজেন্টের ডেমো পেজ
import CompanyLandingPage from "../views/CompanyLandingPage"; // আপনার কোম্পানির প্রাইসিং পেজ
import Projects from "../Projects";
import Team from "../views/Team";
import About from "../views/About";
import Blog from "../views/Blog";
import ProjectDetails from "../views/ProjectDetails";
import UserSignup from "../views/UserSignup";
import UserLogin from "../views/UserLogin"
import AdminLogin from "../views/AdminLogin"
import Dashboard from "../views/AgentDashboard";
import SellerDashboard from "../views/SellerDashboard";
import SelectPlanPage from "../views/SelectPlanPage";
import Register from "../views/Register";
import AgentDashboard from "../views/AgentDashboard";
import SuperAdminDashboard from "../views/SuperAdminDashboard";

// ==========================================
// 🧠 ১. ডোমেইন ও সাব-ডোমেইন চেক করার লজিক
// ==========================================
const hostname = window.location.hostname;
const subdomain = hostname.split('.')[0];


// লোকালহোস্ট এবং আপনার লাইভ মেইন ডোমেইনকে মেইন ডোমেইন ধরা হবে
const isMainDomain = hostname === "localhost" || hostname === "primeestates.com";

// ==========================================
// 👑 ২. মেইন কোম্পানির জন্য রাউটার (যদি ইউজার মেইন ডোমেইনে আসে)
// ==========================================
const mainCompanyRouter = createBrowserRouter([
  {
    path: "/",
    element: <CompanyLandingPage /> // এখানে শুধু আপনার প্রাইসিং ও ফিচারের মেইন ল্যান্ডিং পেজ দেখাবে
  },
  {
    path: "/signup", // নতুন এজেন্টের সাবস্ক্রিপশন কেনার সাইন-আপ ফর্ম
    Component: UserSignup
  },
  {
    path: '/register',
    Component: Register
  },
  {
    path:'/admin/super-dashboard',
    Component:SuperAdminDashboard
  }
  // এখানে আপনার সুপার অ্যাডমিন ড্যাশবোর্ডের রুটও যোগ করতে পারেন পরবর্তীতে
]);

// ==========================================
// 🏢 ৩. এজেন্টের ডেমো সাইটের রাউটার (আপনার আগের রাউটারটি)
// ==========================================
const agentDemoRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        path: '/',
        Component: LandingPage // এজেন্টের ডেমো হোমপেজ
      },
      {
        path: '/projects',
        Component: Projects
      },
      {
        path: '/project-details/:id',
        
        Component: ProjectDetails,
      },
      {
        path: '/team',
        Component: Team
      },
      {
        path: '/about',
        Component: About
      },
      {
        path: '/blog',
        Component: Blog
      },
      {
        path: '/signup',
        Component: UserSignup
      },
      {
        path: '/login',
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
    Component: AgentDashboard
  },
  {
    path: '/admin/seller-dashboard',
    Component: SellerDashboard
  }
]);

// ==========================================
// 🚀 ৪. কন্ডিশন অনুযায়ী সঠিক রাউটারটি এক্সপোর্ট করা
// ==========================================
const router = isMainDomain ? mainCompanyRouter : agentDemoRouter;

export default router;
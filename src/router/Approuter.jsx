import { createBrowserRouter, RouterProvider } from "react-router-dom";

// AUTH
import Login from "../components/Login";
import Signup from "../components/Signup";

// USER
import UserNavbar from "../components/User/UserNavbar";
import { GetApiDemo } from "../components/User/GetApiDemo";
import { UseEffectDemo } from "../components/User/UseEffectDemo";

// ADMIN
import { AdminSidebar } from "../components/admin/AdminSidebar";
import { AllUserList } from "../components/admin/AllUserList";

// Dummy Home Page
const Home = () => <h1 className="text-2xl font-bold">Home Page</h1>;

const router = createBrowserRouter([
  // 🔐 AUTH
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Signup /> },

  // 👤 USER ROUTES
  {
    path: "/user",
    element: <UserNavbar />,
    children: [
      { index: true, element: <Home /> }, // default page
      { path: "getapi", element: <GetApiDemo /> },
      { path: "useeffectdemo", element: <UseEffectDemo /> }
    ]
  },

  // 🛠 ADMIN ROUTES
  {
    path: "/admin",
    element: <AdminSidebar />,
    children: [
      { path: "allusers", element: <AllUserList /> }
    ]
  }
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
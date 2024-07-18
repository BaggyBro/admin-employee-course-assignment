import AdminBoard from "../pages/AdminBoard";
import Login from "../pages/Login";
import UserBoard from "../pages/UserBoard";

const { createBrowserRouter } = require("react-router-dom");
const { default: Home } = require("../pages/Home");
const { default: Registration } = require("../pages/Registration");

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/register",
        element: <Registration/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/adminboard/:userId",
        element: <AdminBoard/>
    },
    {
        path: "/userboard/:userId",
        element: <UserBoard/>
    }
])


export default router
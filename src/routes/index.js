import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import CreateProject from "../pages/create-project/create-project";
import AuthGuard from "../pages/guards/auth.guard";
import NoAuthGuard from "../pages/guards/noAuth.guard";
import ProjectManagement from "../pages/project-management/project-management";

const HomeLayout = lazy(() => import("../layouts/home"))
const Login = lazy(() => import("../pages/login/login"))
const Register = lazy(() => import("../pages/register/register"))
const Home = lazy(() => import("../pages/home/home"))

export default function Router() {
    const routing = useRoutes([
        {
            path: "/",
            element: <AuthGuard />,
            children: [
                {
                    path: '/',
                    element: <HomeLayout />,
                    children: [
                        {
                            path: "/",
                            element: <Home />,
                        },
                        {
                            path: "/create-project",
                            element: <CreateProject />,
                        },
                        {
                            path: "/project-management",
                            element: <ProjectManagement />,
                        },
                    ]
                },

            ]
        },
        {
            path: "/",
            element: <NoAuthGuard />,
            children: [
                {
                    path: "/login",
                    element: <Login />,
                },
                {
                    path: "/register",
                    element: <Register />,
                },

            ]
        },

    ]);
    return routing;
}
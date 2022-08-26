import { lazy } from "react";
import { useRoutes } from "react-router-dom";

const HomeLayout = lazy(() => import("../layouts/home"))
const Login = lazy(() => import("../pages/login/login"))
const Register = lazy(() => import("../pages/register/register"))
const Home = lazy(() => import("../pages/home/home"))
const CreateProject = lazy(() => import("../pages/create-project/create-project"))
const AuthGuard = lazy(() => import("../pages/guards/auth.guard"))
const NoAuthGuard = lazy(() => import("../pages/guards/noAuth.guard"))
const ProjectManagement = lazy(() => import("../pages/project-management/project-management"))

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
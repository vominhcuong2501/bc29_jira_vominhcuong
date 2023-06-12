import { lazy } from "react";
import { useRoutes } from "react-router-dom";
const HomeLayout = lazy(() => import("../layouts/home"));
const Login = lazy(() => import("../pages/login/login"));
const Register = lazy(() => import("../pages/register/register"));
const ProjectDetail = lazy(() =>
  import("../pages/project-detail/project-detail")
);
const CreateProject = lazy(() =>
  import("../pages/create-project/create-project")
);
const AuthGuard = lazy(() => import("../pages/guards/auth.guard"));
const NoAuthGuard = lazy(() => import("../pages/guards/noAuth.guard"));
const ProjectManagement = lazy(() =>
  import("../pages/project-management/project-management")
);
const UserManagement = lazy(() =>
  import("../pages/user-management/user-management")
);

export default function Router() {
  const routing = useRoutes([
    {
      path: "/",
      element: <AuthGuard />,
      children: [
        {
          path: "/",
          element: <HomeLayout />,
          children: [
            {
              path: "/",
              element: <ProjectManagement />,
            },
            {
              path: "/create-project",
              element: <CreateProject />,
            },
            {
              path: "/project-detail/:projectId",
              element: <ProjectDetail />,
            },
            {
              path: "/user-management",
              element: <UserManagement />,
            },
          ],
        },
      ],
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
      ],
    },
  ]);
  return routing;
}

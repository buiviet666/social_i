import React from "react";
import ROUTES from "./Routes";
import { BellOutlined, HomeOutlined, PlusCircleOutlined, SearchOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Create, Notify, Search } from "../components";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoutes from "../components/ProtectedRoutes/ProtectedRoutes";

const Home = React.lazy(() => import("../pages/Home/Home"));
const Profile = React.lazy(() => import("../pages/Profile/Profile"));
const Page404 = React.lazy(() => import("../pages/Page404/Page404"));
const Login = React.lazy(() => import("../pages/Login/Login"));
const Signin = React.lazy(() => import("../pages/Signin/Signin"));
const SetupProfile = React.lazy(() => import("../pages/setupProfile/setupProfile"));

interface CustomRouter {
    path?: string;
    element?: React.ReactElement;
    children?: CustomRouter[];
    label?: string;
    isMenuItem?: boolean;
    icon?: React.ReactElement;
    render?: React.ReactElement;
    auth?: boolean;
    moreItem?: boolean;
    errorElement?: React.ReactElement;
}

const routes: CustomRouter[] = [
    {
        element: <ProtectedRoutes />,
        children: [
            {
                path: ROUTES.HOME,
                element: <Home />,
                label: "HOME",
                icon: <HomeOutlined />,
                isMenuItem: true,
                errorElement: <Page404 />
            },
            {
                render: <Search />,
                label: "SEARCH",
                icon: <SearchOutlined />,
                isMenuItem: true,
                errorElement: <Page404 />
            },
            {
                render: <Notify />,
                label: "NOTIFY",
                icon: <BellOutlined />,
                isMenuItem: true,
                errorElement: <Page404 />
            },
            {
                render: <Create />,
                label: "CREATE",
                icon: <PlusCircleOutlined />,
                isMenuItem: true,
                errorElement: <Page404 />
            },
            {
                path: ROUTES.PROFILE,
                element: <Profile />,
                label: "PROFILE",
                icon: <UserOutlined />,
                isMenuItem: true,
                auth: true,
                errorElement: <Page404 />
            },
            {
                path: ROUTES.PAGE404,
                element: <Page404 />,
                label: "PAGE404",
                auth: true,
                errorElement: <Page404 />
            },
            {
                path: ROUTES.SETTING,
                element: <SetupProfile />,
                label: "SETTING",
                icon: <SettingOutlined />,
                moreItem: true,
                auth: true,
                errorElement: <Page404 />
            }
        ],
        errorElement: <Page404 />
    },
    {
        path: ROUTES.LOGIN,
        element: <Login />,
        auth: true,
        errorElement: <Page404 />
    },
    {
        path: ROUTES.SIGNIN,
        element: <Signin />,
        auth: true,
        errorElement: <Page404 />
    }];

const RoutesList = createBrowserRouter(routes);

export default RoutesList;
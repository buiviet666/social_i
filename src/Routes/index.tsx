import React from "react";
import ROUTES from "./Routes";
import { BellOutlined, HomeOutlined, PlusCircleOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
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
    key?: string;
    path?: string;
    element?: React.ReactElement;
    children?: CustomRouter[];
    label?: string;
    isMenuItem?: boolean;
    icon?: React.ReactElement;
    render?: boolean;
    auth?: boolean;
    errorElement?: React.ReactElement;
    popUp?: boolean;
}

export const routes: CustomRouter[] = [
    {
        element: <ProtectedRoutes />,
        children: [
            {
                path: ROUTES.HOME,
                element: <Home />,
                label: "HOME",
                icon: <HomeOutlined />,
                isMenuItem: true,
                errorElement: <Page404 />,
                key: '0'
            },
            {
                element: <Search />,
                label: "SEARCH",
                icon: <SearchOutlined />,
                isMenuItem: true,
                errorElement: <Page404 />,
                render: true,
                key: '1'
            },
            {
                element: <Notify />,
                label: "NOTIFY",
                icon: <BellOutlined />,
                isMenuItem: true,
                errorElement: <Page404 />,
                render: true,
                key: '2'
            },
            {
                element: <Create />,
                label: "CREATE",
                icon: <PlusCircleOutlined />,
                isMenuItem: true,
                errorElement: <Page404 />,
                popUp: true,
                render: true,
                key: '3',
            },
            {
                path: ROUTES.PROFILE,
                element: <Profile />,
                label: "PROFILE",
                icon: <UserOutlined />,
                isMenuItem: true,
                auth: true,
                errorElement: <Page404 />,
                key: '4',
            },
            {
                path: ROUTES.PAGE404,
                element: <Page404 />,
                label: "PAGE404",
                auth: true,
                errorElement: <Page404 />,
                key: '5',
            },
            {
                path: ROUTES.SETTING,
                element: <SetupProfile />,
                label: "SETTING",
                auth: true,
                errorElement: <Page404 />,
                key: '6',
            }
        ],
        errorElement: <Page404 />,
        key: '8',
    },
    {
        path: ROUTES.LOGIN,
        element: <Login />,
        auth: true,
        errorElement: <Page404 />,
        key: '9'
    },
    {
        path: ROUTES.SIGNIN,
        element: <Signin />,
        auth: true,
        errorElement: <Page404 />,
        key: '10'
    }];

const RoutesList = createBrowserRouter(routes);

export default RoutesList;
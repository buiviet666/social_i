import React from "react";
import ROUTES from "./Routes";
import { BellOutlined, HomeOutlined, PlusCircleOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Create, Notify, Search } from "../components";

const RoutesList = [
    {
        path: ROUTES.HOME,
        component: React.lazy(() => import("../pages/Home/Home")),
        label: "HOME",
        icon: <HomeOutlined />,
        isMenuItem: true,
    },
    {
        render: <Search />,
        label: "SEARCH",
        icon: <SearchOutlined />,
        isMenuItem: true,
    },
    {
        render: <Notify />,
        label: "NOTIFY",
        icon: <BellOutlined />,
        isMenuItem: true,
    },
    {
        render: <Create />,
        label: "CREATE",
        icon: <PlusCircleOutlined />,
        isMenuItem: true,
    },
    {
        path: ROUTES.PROFILE,
        component: React.lazy(() => import("../pages/Profile/Profile")),
        label: "PROFILE",
        icon: <UserOutlined />,
        isMenuItem: true,
        auth: true
    },
    {
        path: ROUTES.PAGE404,
        component: React.lazy(() => import("../pages/Page404/Page404")),
        label: "PAGE404",
        auth: true
    },
    {
        path: ROUTES.LOGIN,
        component: React.lazy(() => import("../pages/Login/Login")),
        auth: true
    },
    {
        path: ROUTES.SIGNIN,
        component: React.lazy(() => import("../pages/Signin/Signin")),
        auth: true
    }
];

export default RoutesList;
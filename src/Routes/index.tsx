import React from "react";
import ROUTES from "./Routes";
import { BellOutlined, HomeOutlined, PlusCircleOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";

const Routes = [
    {
        path: ROUTES.HOME,
        component: React.lazy(() => import("../pages/Home/Home")),
        label: "HOME",
        icon: <HomeOutlined />,
        isMenuItem: true,
    },
    {
        // path: ROUTES.SEARCH,
        // component: React.lazy(() => import("../")),
        label: "SEARCH",
        icon: <SearchOutlined />,
        isMenuItem: true,
    },
    {
        // path: ROUTES.NOTIFY,
        // component: React.lazy(() => import("../")),
        label: "NOTIFY",
        icon: <BellOutlined />,
        isMenuItem: true,
    },
    {
        // path: ROUTES.CREATE,
        // component: React.lazy(() => import("../")),
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
    },
    {
        path: ROUTES.PAGE404,
        component: React.lazy(() => import("../pages/Page404/Page404")),
        label: "PAGE404",
    }
];

export default Routes;
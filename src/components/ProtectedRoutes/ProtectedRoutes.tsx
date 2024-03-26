import React, { useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export interface ProtectedRoutesProps {
}

export default function ProtectedRoutes(props: ProtectedRoutesProps) {

    const isAuth: boolean = true;
    const location = useLocation();
    // const [,] = useState

    //     if (loading) {
    //         return <div>...loading</div>
    //     }

    return isAuth ?
        (<Outlet />) :
        (<Navigate to="/login" state={{ from: location }} />);
}

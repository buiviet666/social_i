import { getAuth } from 'firebase/auth';
// import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";

export interface ProtectedRoutesProps {
}

export default function ProtectedRoutes() {
    // props: ProtectedRoutesProps

    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const location = useLocation();

    if (loading) {
        return <div>...loading</div>
    }

    return user ?
        (<Outlet />) :
        (<Navigate to="/login" state={{ from: location }} />);
}

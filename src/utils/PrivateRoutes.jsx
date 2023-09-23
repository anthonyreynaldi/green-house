import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser, isAllowedUser, isLogin } from "./Auth";
import { useEffect, useState } from "react";

export default function PrivateRoutes(){
    const [access, setAccess] = useState(isLogin());
    
    window.addEventListener('storage', (e) => {
        if (e.key === 'user') {
            console.log('localStorage has changed:', e.newValue);
            const isAccess = isLogin();
            setAccess(isAccess);
        }
    });
    
    return (
        access ? <Outlet/> : <Navigate to="/login" />
    )
}
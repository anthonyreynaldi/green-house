import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser, isAllowedUser, isLogin } from "./Auth";
import { allowedEmail } from "../config/AllowedEmail";
import { useEffect, useState } from "react";

export default function PrivateRoutes(){
    const [access, setAccess] = useState(isLogin() && allowedEmail.includes(getCurrentUser().email));
    
    window.addEventListener('storage', (e) => {
        if (e.key === 'user') {
            console.log('localStorage has changed:', e.newValue);
            const isAccess = isLogin() && isAllowedUser();
            setAccess(isAccess);
        }
    });
    
    return (
        access ? <Outlet/> : <Navigate to="/login" />
    )
}
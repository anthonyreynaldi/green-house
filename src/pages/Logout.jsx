import { Navigate } from "react-router-dom";
import { signOutAuth } from "../utils/Auth";

export default function Logout(){
    signOutAuth();
    
    return (
        <Navigate to="/login"/>
    );
}
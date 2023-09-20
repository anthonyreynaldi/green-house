import { Outlet } from "react-router-dom";
import NavbarLayout from "./NavbarLayout";

export default function BaseLayout() {
    return (
        <>
        <div style={{position: "fixed", zIndex: "1", marginLeft: "25%", width: "50%"}}>
        <NavbarLayout/>
        </div>
            <div className="container px-4 lg:mx-auto max-w-screen-xl" style={{zIndex: "0"}}>
                <Outlet/>
            </div>
        </>
    )
}
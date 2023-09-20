import { Outlet } from "react-router-dom";
import NavbarLayout from "./NavbarLayout";
import ComplexNavbar from "./NavbarLayout";

export default function BaseLayout() {
    return (
        <>
            <div className="container py-5 px-4 lg:mx-auto max-w-screen-xl min-h-screen">
                <NavbarLayout/>
                <Outlet/>
            </div>
        </>
    )
}
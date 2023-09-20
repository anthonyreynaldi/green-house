import { Outlet } from "react-router-dom";
import NavbarLayout from "./NavbarLayout";
import ComplexNavbar from "./NavbarLayout";

export default function BaseLayout() {
    return (
        <>
            <div className="container px-4 lg:mx-auto max-w-screen-xl">
                {/* <NavbarLayout/> */}
                <ComplexNavbar/>

                <Outlet/>
            </div>
        </>
    )
}
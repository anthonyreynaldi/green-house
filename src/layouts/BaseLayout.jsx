import { Outlet } from "react-router-dom";
import NavbarLayout from "./NavbarLayout";

export default function BaseLayout() {
    return (
        <>
            <div className="container px-4 lg:mx-auto max-w-screen-xl transition-reveal" id="swup">
                <NavbarLayout/>

                <Outlet/>
            </div>
        </>
    )
}
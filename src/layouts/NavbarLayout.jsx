import {
    Navbar,
    Typography,
    IconButton,
    Button,
    Input,
  } from "@material-tailwind/react";
import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function NavbarLayout() {
    return(
        <>
            <Navbar className="mt-4 mx-auto max-w-screen-xl px-4 py-3 bg-green-400" data-aos="fade-left">
                <div className="flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900">
                    <Typography
                    variant="h6"
                    className="mr-4 ml-2 cursor-pointer py-1.5"
                    >
                        <Link to="/">
                            Green House
                        </Link>
                    </Typography>

                    <div className="relative flex w-full gap-2 md:w-max">
                        <Input
                            type="search"
                            label="Cari Tanaman ..."
                            className="pr-20"
                            color="black"
                            containerProps={{
                                className: "min-w-[288px]",
                            }}
                        />
                        <Button size="sm" className="!absolute right-1 top-1 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                            </svg>
                        </Button>
                    </div>
                </div>
            </Navbar>
        </>
    );
}
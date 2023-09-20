// import {
//     Navbar,
//     Typography,
//     IconButton,
//     Button,
//     Input,
//   } from "@material-tailwind/react";
// import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
// import { Link } from "react-router-dom";
// import { isLogin, signOutAuth } from "../utils/Auth";

 function NavbarLayout() {
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
                        <Button size="sm" className="">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                            </svg>
                        </Button>

                        {
                            isLogin() ?
                            (
                                <Button color="red" size="sm" onClick={signOutAuth}>
                                    <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                                </Button>
                            )
                            :
                            ("")
                        }
                    </div>
                </div>
            </Navbar>
        </>
    );
}

import React, { useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";
 
// profile menu component
const profileMenuItems = [
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];
 
function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 
  const closeMenu = () => setIsMenuOpen(false);
 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>

      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
 
// nav list menu
const navListMenuItems = [
  {
    title: "@material-tailwind/html",
    description:
      "Learn how to use @material-tailwind/html, packed with rich components and widgets.",
  },
  {
    title: "@material-tailwind/react",
    description:
      "Learn how to use @material-tailwind/react, packed with rich components for React.",
  },
  {
    title: "Material Tailwind PRO",
    description:
      "A complete set of UI Elements for building faster websites in less time.",
  },
];
 
function NavListMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    
    const renderItems = navListMenuItems.map(({ title, description }) => (
    <a href="#" key={title}>
      <MenuItem>
        <Typography variant="h6" color="blue-gray" className="mb-1">
          {title}
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          {description}
        </Typography>
      </MenuItem>
    </a>
  ));
 
  return (
    <React.Fragment>
        <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
            <MenuHandler>
                <Typography as="a" href="#" variant="small" className="font-normal">
                    <MenuItem className="hidden items-center gap-2 text-blue-gray-900 lg:flex lg:rounded-full">
                        <Square3Stack3DIcon className="h-[18px] w-[18px]" /> Pages{" "}
                        <ChevronDownIcon
                            strokeWidth={2}
                            className={`h-3 w-3 transition-transform ${
                            isMenuOpen ? "rotate-180" : ""
                            }`}
                        />
                    </MenuItem>
                </Typography>
            </MenuHandler>

            <MenuList className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid">
                <ul className="col-span-4 flex w-full flex-col gap-1">
                    {renderItems}
                </ul>
            </MenuList>
        </Menu>
    </React.Fragment>
  );
}
 
// nav list component
const navListItems = [
  {
    label: "Admin",
    icon: UserCircleIcon,
  },
];
 
function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
        <NavListMenu />
        {navListItems.map(({ label, icon }, key) => (
            <Typography
                key={label}
                as="a"
                href="#"
                variant="small"
                color="blue-gray"
                className="font-normal"
            >
                <MenuItem className="flex items-center gap-2 lg:rounded-full">
                    {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
                    {label}
                </MenuItem>
            </Typography>
        ))}
    </ul>
  );
}
 
export default function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
 
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);
 
  return (
    <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">

        <div className="relative mx-auto flex items-center text-blue-gray-900">
            <Typography
                as="a"
                href="#"
                className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
            >
                Material Tailwind
            </Typography>

            <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
                <NavList />
            </div>

            {/* Icon toogle for mobile */}
            <IconButton
                size="sm"
                color="blue-gray"
                variant="text"
                onClick={toggleIsNavOpen}
                className="ml-auto mr-2 lg:hidden"
            >
                <Bars2Icon className="h-6 w-6" />
            </IconButton>

            <ProfileMenu />
            
        </div>

        {/* Navlist when mobile */}
        <Collapse open={isNavOpen} className="overflow-scroll">
            <NavList />
        </Collapse>
    </Navbar>
  );
}
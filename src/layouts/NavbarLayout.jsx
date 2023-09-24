import React, { useEffect, useState } from "react";
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
  Input
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
  MagnifyingGlassIcon,
  AtSymbolIcon
} from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import logo from "/images/logo-bg.png";
import { getCurrentUser, isLogin } from "../utils/Auth";
import { getAllPlant } from "../utils/PlantDataUtils";
 
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
            className="border border-gray-900 p-0.5"
            src={getCurrentUser().photoURL}
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
            <Link to="/logout">
                <MenuItem
                    onClick={closeMenu}
                    className={`flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10`}>
                        <PowerIcon strokeWidth="2" className="h-4 w-4 text-red-500" />
                        <Typography
                            as="span"
                            variant="small"
                            className="font-normal"
                            color="red"
                        >
                            Log Out
                        </Typography>
                </MenuItem>
            </Link>
      </MenuList>
    </Menu>
  );
}
 
// nav list menu
 
function NavListMenu() {
    const [allPlants, setAllPlants] = useState([]);
    const [filterPlants, setFilterPlants] = useState([]);

    const getData = async () => {
        const plantData = await getAllPlant();
        setAllPlants(plantData);
    }

    const handleSearch = (keyword) => {

        if(keyword == ""){
            setFilterPlants([]);
            return;
        }

        keyword = keyword.toLowerCase();

        const tempFilter = allPlants.filter((item) => item.name.toLowerCase().includes(keyword) || item.nameLatin.toLowerCase().includes(keyword));

        setFilterPlants(tempFilter);
    }

    useEffect(() => {
        getData();
    }, []);
 
    return (
        <React.Fragment>
            <Menu dismiss={{ itemPress: false }}>
                <MenuHandler>
                    <MenuItem className="items-center flex gap-2 text-blue-gray-900 lg:flex lg:rounded-full">
                        <MagnifyingGlassIcon className="h-[18px] w-[18px]" /> Cari {" "}
                    </MenuItem>
                </MenuHandler>

                <MenuList>
                    <Input
                        label="Search"
                        containerProps={{
                            className: "mb-4",
                        }}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <div className="max-h-72 overflow-scroll hover:border-0">
                        {
                            filterPlants?.map(({ name, nameLatin, images, tag }) => (
                                <Link to={"/tanaman/" + tag} key={tag}>
                                    <MenuItem className="flex items-center gap-4 py-2 pr-8 pl-2">
                                        <Avatar
                                            variant="circular"
                                            src={Array.isArray(images) ? images[0] : ""}
                                        />
                                        <div className="flex flex-col gap-1">
                                            <Typography variant="small" color="gray" className="font-normal">
                                                <span className="font-medium text-blue-gray-900">
                                                    {name}    
                                                </span>
                                            </Typography>
                    
                                            <Typography
                                                variant="small"
                                                className="flex items-center gap-1 text-sm text-gray-600"
                                            >
                                                {nameLatin}
                                            </Typography>
                                        </div>
                                    </MenuItem>
                                </Link>
                            ))
                        }
                        {
                            filterPlants.length == 0 ?
                            (
                                <MenuItem className="flex items-center gap-4 py-2 pr-8 pl-2">
                                    <div className="flex flex-col gap-1">
                                        <Typography variant="small" color="gray" className="font-normal">
                                            <span className="font-medium text-blue-gray-900">
                                                Tanaman tidak ditemukan
                                            </span>
                                        </Typography>
                                    </div>
                                </MenuItem>
                            )
                            :
                            ("")
                        }
                    </div>
                </MenuList>
            </Menu>
        </React.Fragment>
    );
}
 
// nav list component
const navListItems = isLogin() ?  
[
    {
        label: "Admin",
        icon: UserCircleIcon,
        link: "/admin"
    },
    {
        label: "Email",
        icon: AtSymbolIcon,
        link: "/admin/email"
    }
]
:
[];
 
function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
        <NavListMenu />
        {navListItems.map(({ label, icon, link }, key) => (
            
            <Link to={link} key={label}>
                <Typography
                    
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                >
                    <MenuItem className="flex items-center gap-2 lg:rounded-full">
                        {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
                        {label}
                    </MenuItem>
                </Typography>
            </Link>
        ))}
    </ul>
  );
}
 
export default function NavbarLayout() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
 
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);
 
  return (
    <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6 bg-gradient-to-br from-[#1aaf91] to-[#25c986]">

        <div className="relative mx-auto flex items-center text-blue-gray-900">
            <Link to="/" className="flex">
            
                <Avatar
                    variant="circular"
                    size="sm"
                    alt="tania andrew"
                    className="mr-2 p-0.5"
                    src={logo}
                />
                <Typography
                    variant="h6"
                    className="mr-4 ml-2 cursor-pointer py-1.5"
                >

                    Tanaman Obat Keluarga Siwalankerto
                </Typography>
            </Link>

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

            {
                isLogin() ?
                (
                    <ProfileMenu />
                )
                :
                ("")
            }
            
        </div>

        {/* Navlist when mobile */}
        <Collapse open={isNavOpen}>
            <NavList />
        </Collapse>
    </Navbar>
  );
}

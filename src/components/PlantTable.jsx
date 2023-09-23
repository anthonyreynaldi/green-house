import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Avatar,
  IconButton,
  Tooltip,
  Input,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import PlantQRCode from "./PlantQRCode";
import { Link } from "react-router-dom";
import { deletePlant, getAllPlant } from "../utils/PlantDataUtils";
 
const TABLE_HEAD = ["Gambar", "Tag", "Nama", "Nama Latin", "QR Code", "Edit", "Hapus"];
 
export function PlantTable() {
    const [TABLE_ROWS, setTABLE_ROWS] = useState([]);
    const [allPlants, setAllPlants] = useState([]);
    const [isPlantExist, setIsPlantExist] = useState(true);
    const [open, setOpen] = useState(false);
    const [plantId, setPlantId] = useState(null);

    // Get base url
    const currentUrl = window.location.href;
    const baseUrl = currentUrl.match(/^(.*?:\/\/[^/]+)/)[0];
    const baseLink = baseUrl + "/tanaman/";
 
    const handleOpen = (plantId) => {
        setPlantId(plantId);
        console.log("current plant id = " + plantId);
        setOpen(!open);
    }

    const handleDelete = () => {
        if(plantId){
            console.log(plantId + " will be deleted");
            deletePlant(plantId).then(() => {
                getAllPlant().then((allPlants) => {
                    if(allPlants){
                        setAllPlants(allPlants);
                        setTABLE_ROWS(allPlants);
                    }else{
                        setIsPlantExist(false);
                    }
                });
            });
        }
        setOpen(!open);
    }

    const handleSearch = (keyword) => {
        if(keyword == ""){
            setTABLE_ROWS(allPlants);
            return;
        }

        keyword = keyword.toLowerCase();

        const tempFilter = allPlants.filter((item) => item.name.toLowerCase().includes(keyword) || item.nameLatin.toLowerCase().includes(keyword) || item.tag.toLowerCase().includes(keyword));

        setTABLE_ROWS(tempFilter);
    }

    const reloadTable = () => {
        getAllPlant().then((allPlants) => {
            if(allPlants){
                setAllPlants(allPlants);
                setTABLE_ROWS(allPlants);
            }else{
                setIsPlantExist(false);
            }
        });
    }

    useEffect(() => {
        getAllPlant().then((allPlants) => {
            if(allPlants){
                setAllPlants(allPlants);
                setTABLE_ROWS(allPlants);
            }else{
                setIsPlantExist(false);
            }
        });
    }, [])

    useEffect(() => {
        //refresh the table if it from reirect back
        const handlePopState = () => {
            console.log("popedd");
            getAllPlant().then((allPlants) => {
                if(allPlants){
                    setAllPlants(allPlants);
                    setTABLE_ROWS(allPlants);
                }else{
                    setIsPlantExist(false);
                }
            });
        };
    
        // Add the popstate event listener
        window.addEventListener('popstate', handlePopState);
    
        // Clean up the event listener when the component unmounts
        return () => {
          window.removeEventListener('popstate', handlePopState);
        };
      }, []);

    return (
    <>
        <Card className="h-full w-full overflow-x-scroll" data-aos="fade-left">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Manage Data Tanaman
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            CRUD
                        </Typography>
                    </div>
                    <div className="flex flex-col w-full shrink-0 gap-2 md:w-max md:flex-row">
                        <IconButton variant="text" onClick={reloadTable}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                        </IconButton>

                        <div className="w-full md:w-72">
                            <Input
                                label="Search"
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </div>

                        <Button>
                            <Link to={"manage"} className="flex items-center gap-3">
                                <PlusIcon strokeWidth={2} className="h-4 w-4" />
                                Tambah Tanaman
                            </Link> 
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="h-96 overflow-scroll px-0">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                        {TABLE_HEAD.map((head) => (
                            <th
                            key={head}
                            className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        {TABLE_ROWS.map(
                        (
                            {
                            id,
                            name,
                            nameLatin,
                            images,
                            tag,
                            },
                            index,
                        ) => {
                            const isLast = index === TABLE_ROWS.length - 1;
                            const classes = isLast
                            ? "p-4"
                            : "p-4 border-b border-blue-gray-50";
            
                            return (
                            <tr key={index}>
                                <td className={classes}>
                                    <div className="flex items-center gap-3">
                                        <Avatar
                                        src={Array.isArray(images) ? images[0] : "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"}
                                        size="md"
                                        className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                                        />
                                    </div>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {tag ?? " - "}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {name ?? " - "}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {nameLatin ?? " - "}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <div className="flex items-center gap-3">
                                        <PlantQRCode link={baseLink+tag} name={name} nameLatin={nameLatin} />
                                    </div>
                                </td>

                                <td className={classes}>
                                    <Tooltip content="Edit Tanaman">
                                        <Link to={"manage/"+id}>
                                            <IconButton variant="text">
                                                <PencilIcon className="h-4 w-4" />
                                            </IconButton>
                                        </Link>
                                    </Tooltip>
                                </td>

                                <td className={classes}>
                                    <Tooltip content="Hapus Tanaman">
                                        <IconButton variant="text">
                                            <TrashIcon color="red" className="h-4 w-4" onClick={() => handleOpen(id)} />
                                        </IconButton>
                                    </Tooltip>
                                </td>
                            </tr>
                            );
                        },
                        )}
                    </tbody>
                </table>
            </CardBody>
        </Card>

        <Dialog
            open={open}
            handler={handleOpen}
            animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
            }}
            >
            <DialogHeader>
                Apakah Anda yakin ingin menghapus tanaman ini?
            </DialogHeader>

            <DialogBody divider>
                Tanaman yang sudah dihapus tidak dapat dikembalikan
            </DialogBody>

            <DialogFooter>
                <Button
                    variant="text"
                    color="green"
                    onClick={handleOpen}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="red" onClick={handleDelete}>
                    <span>Hapus</span>
                </Button>
            </DialogFooter>
        </Dialog>
    </>
  );
}
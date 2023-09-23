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
import { addEmail, deleteEmail, getAllowedEmail } from "../utils/Email";

const TABLE_HEAD = ["Email", "Hapus"];

export default function AdminEmail() {
    const [TABLE_ROWS, setTABLE_ROWS] = useState([]);
    const [allowedEmail, setAllowedEmail] = useState([]);
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState(null);
    const [newEmail, setNewEmail] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllowedEmail().then((result) => {
            result ? setAllowedEmail(result) : setAllowedEmail([]);
            console.log(result);
        });

    }, [])

    const handleOpen = (email) => {
        setEmail(email);
        console.log("current email = " + email);
        setOpen(!open);
    }

    const handleAdd = async () => {
        if(newEmail){
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if ( re.test(newEmail) ) {
                await addEmail({email: newEmail});
                await setTableData();
    
                setNewEmail("");
                setError("");
            }else{
                setError("Format email salah");
            }
        }else{
            setError("Email tidak boleh kosong");
        }
    }

    const setTableData = async () => {
        getAllowedEmail().then((allowedEmail) => {
            if(allowedEmail){
                setAllowedEmail(allowedEmail);
                setTABLE_ROWS(allowedEmail);
            }else{
                setAllowedEmail([]);
                setTABLE_ROWS([]);
            }
        });
    }

    const handleDelete = () => {
        if(email){
            console.log(email + " will be deleted");
            deleteEmail(email).then(async () => {
                await setTableData();
            });
        }
        setOpen(!open);
    }

    const handleSearch = (keyword) => {
        if(keyword == ""){
            setTABLE_ROWS(allowedEmail);
            return; 
        }

        keyword = keyword.toLowerCase();

        const tempFilter = allowedEmail.filter((item) => item.email.toLowerCase().includes(keyword));

        setTABLE_ROWS(tempFilter);
    }

    useEffect(() => {
        setTableData();
    }, [])

    useEffect(() => {
        //refresh the table if it from reirect back
        const handlePopState = () => {
            setTableData();
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
        <Card className="h-full w-full overflow-x-scroll mt-6" data-aos="fade-left">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center py-3">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Manage Data Email Admin
                        </Typography>
                    </div>
                    <div className="flex flex-col w-full shrink-0 gap-2 md:w-max md:flex-row">
                        <div className="w-full md:w-72">
                            <Input
                                label="Search"
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </div>

                        <div className="relative flex w-full overflow-visible">
                            <Input
                                type="email"
                                label="Email Baru"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value.toLowerCase())}
                                className="pr-20"
                                containerProps={{
                                className: "min-w-0",
                                }}
                            />
                            <Button
                                size="sm"
                                color={newEmail ? "gray" : "blue-gray"}
                                disabled={!newEmail}
                                className="!absolute right-1 top-1 rounded"
                                onClick={handleAdd}
                            >
                                Tambah
                            </Button>

                            {
                                error ? 
                                (
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="!absolute left-0 bottom-0 translate-y-6 mt-2 flex items-center gap-1 font-normal"
                                    >
                                        <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="-mt-px h-4 w-4"
                                        >
                                        <path
                                            fillRule="evenodd"
                                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                            clipRule="evenodd"
                                        />
                                        </svg>
                                        Format email salah
                                    </Typography>
                                )
                                :
                                ("")
                            }

                        </div>
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
                            email,
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
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {email ?? " - "}
                                    </Typography>
                                </td>

                                <td className={classes}>
                                    <Tooltip content="Hapus Email">
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
                Apakah Anda yakin ingin menghapus email ini?
            </DialogHeader>

            <DialogBody divider>
                Email yang sudah dihapus tidak dapat dikembalikan
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
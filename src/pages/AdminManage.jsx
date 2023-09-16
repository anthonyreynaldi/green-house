import { useParams } from "react-router-dom";
import {
    Card,
    Input,
    Button,
    Typography,
    Dialog,
    DialogBody,
    Spinner,
    DialogHeader,
    DialogFooter,
} from "@material-tailwind/react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect, useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { createPlant, deletePlant, editPlant, getPlant, getPlantImageUrl, isTagExist, uploadPlantImage } from "../utils/plantDataUtils";

export default function AdminManage(){
    const { plantTag } = useParams();
    const [name, setName] = useState("");
    const [nameLatin, setNameLatin] = useState("");
    const [tag, setTag] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [open, setOpen] = useState(false);
    const [disabledButton, setDisableButton] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [currIndexDelete, setCurrIndexDelete] = useState(null);


    const handleOpenDelete = (index) => {
        setOpenDelete(!openDelete);
        setCurrIndexDelete(index);
    }

    const checkRequired = () => {
        console.log("chekced = " + (name === "" || nameLatin === "" || tag === ""));
        setDisableButton(name === "" || nameLatin === "" || tag === "");
    }
    
    const handleName = (e) => {
        const newName = e.target.value;
        let tempTag = newName.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, '-').toLowerCase();

        isTagExist(tempTag).then((numExist) => {
            if (numExist) {
                tempTag = tempTag + (numExist + 1);
                console.log("plant tag exist");

            }else{
                console.log("plant tag not yet existed");
            }

            setTag(tempTag);
            setName(newName);
            checkRequired();
        });

    };
    const handleNameLatin = (e) => {
        setNameLatin(e.target.value)
        checkRequired();
    };
    
    const handleDescription = (e, editor) => {
        setDescription(editor.getData());
        checkRequired();
    };

    const handleImages = async (e) => {
        const file = e.target.files[0];
        const fileName = Date.now() + "_" + file.name;

        //preview loading upload image
        setIsUploading(true);
        setImages([...images, URL.createObjectURL(file)]);

        //upload image
        await uploadPlantImage(fileName, file);

        //get the download url
        const downloadURL = await getPlantImageUrl(fileName);
        console.log('File available at', downloadURL);

        //change the priview with real url
        let newArr = [...images];
        newArr[newArr.length] = downloadURL;

        setImages(newArr);
        setIsUploading(false);

        checkRequired();
    };
    
    const handleSave = async () => {
        setOpen(true);

        if(name === "" || nameLatin === "" || tag === ""){
            return;
        }

        const newPlant = {
            name: name,
            nameLatin: nameLatin,
            tag: tag,
            description: description,
            images: images
        };

        console.log(newPlant);

        if(!plantTag){
            //create new plant
            await createPlant(newPlant)

        }else if(plantTag != newPlant.tag){
            //in case change plant tag
            //delete the old one
            await deletePlant(plantTag);

            //create the new one
            await createPlant(newPlant);
        }else{
            //edit plant
            await editPlant(newPlant);
        }
        return history.back();
    };

    const handleDeleteImage = () => {
        if(currIndexDelete !== null){
            //delete image from array
            setImages(images.filter((item, i) => i !== currIndexDelete));
            setOpenDelete(false);
        }
    }

    useEffect(() => {
        const init = () => {
            if(plantTag){
                getPlant(plantTag).then((plant) => {
                    setName(plant.name);
                    setNameLatin(plant.nameLatin);
                    setTag(plant.tag);
                    setDescription(plant.description);
                    setImages(plant.images);
                });
            }
        }
        
        init();
    }, []);
    
    useEffect(() => {
        checkRequired();
    });
    return(
        <>
            <div className="grid mt-5" data-aos="fade-left">
                <Card className="text-center p-5" color="transparent" shadow={true}>
                    <Typography variant="h4" color="blue-gray" className="mb-5">
                        Manage Tanaman
                    </Typography>

                    <div className="mb-4 grid grid-cols-2 gap-6">
                        <Input size="lg" label="Nama" onChange={handleName} value={name} required/>
                        <Input size="lg" label="Nama Latin" onChange={handleNameLatin} value={nameLatin} required/>
                    </div>

                    <Typography variant="h6" color="blue-gray" className="my-5 text-left">
                        Tag
                    </Typography>

                    <Input size="lg" label="Tag" value={tag} disabled/>

                    <Typography variant="h6" color="blue-gray" className="my-5 text-left">
                        Deskripsi
                    </Typography>

                    <CKEditor
                        editor={ClassicEditor}
                        data={description}
                        onChange={handleDescription}
                        style={{ 
                            '.ck-editor__editable_inline' : {
                                padding: '100px !important'
                            }
                         }}
                    />

                    <div className="revert-css" dangerouslySetInnerHTML={{ __html: description }}></div>
                    
                    <Typography variant="h6" color="blue-gray" className="my-5 text-left">
                        Gambar
                    </Typography>
       
                    <div className="grid grid-cols-5 gap-4 mb-5">
                        {images.map((img, i) => (
                            <figure className="relative h-40 w-full" key={i}>
                                <img
                                    className={`h-full w-full rounded-xl object-cover object-center ${/*last image*/ i == images.length - 1 && isUploading ? "blur-sm" : ""}`}
                                    src={img}
                                    alt="nature image"
                                />

                                {
                                    i == images.length - 1 && isUploading ?
                                    (
                                        <figcaption className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
                                            <Spinner className="h-12 w-12" />
                                        </figcaption>
                                    )
                                    :
                                    (
                                        <figcaption onClick={() => handleOpenDelete(i)} color="red" className="absolute top-0 right-0 translate-x-2/4 -translate-y-2/4 flex rounded-xl">
                                            <XCircleIcon className="w-8 h-8" color="red"/>
                                        </figcaption>
                                    )

                                }
                            </figure>
                        ))}

                    </div>


                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click untuk upload</span> atau drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Gambar dengan rasio 1:1 (MAX. 2 MB)</p>
                            </div>
                            <input id="dropzone-file" type="file" accept="image/*" className="hidden" onChange={handleImages}/>
                        </label>
                    </div> 

                    <Button className="mt-6" fullWidth disabled={disabledButton} onClick={handleSave}>
                        SIMPAN
                    </Button>
                </Card>
        
                <Dialog open={open} size="xs">
                    <DialogBody divider>
                        <div className="flex ">
                            <Spinner className="h-12 w-12" />
                            <Typography variant="h4" className="mx-3 inline-block align-middle">
                                Loading . . .
                            </Typography>
                        </div>
                    </DialogBody>
                </Dialog>

                <Dialog
                    open={openDelete}
                    handler={handleOpenDelete}
                    animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                    }}
                    >
                    <DialogHeader>
                        Apakah Anda yakin ingin menghapus gambar ini?
                    </DialogHeader>

                    <DialogBody divider>
                        Gambar yang sudah dihapus tidak dapat dikembalikan
                    </DialogBody>

                    <DialogFooter>
                        <Button
                            variant="text"
                            color="green"
                            onClick={handleOpenDelete}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button variant="gradient" color="red" onClick={handleDeleteImage}>
                            <span>Hapus</span>
                        </Button>
                    </DialogFooter>
                </Dialog>
            </div>
        </>
    );
}
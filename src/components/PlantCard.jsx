import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
  } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";

export default function PlantCard({name, nameLatin, images, tag}){

    return (
        <>
            <Link to={tag ? "tanaman/" + tag : ""}>
                <Card className="bg-gradient-to-t from-[#38ca94] to-[#64d6ac] shadow h-full" data-aos="fade-left">
                    <CardHeader floated={false} className="h-32 md:h-40 lg:h-52">
                        <img className="h-full w-full object-cover transform scale-100 hover:scale-110 transition-transform duration-300" src={Array.isArray(images) ? images[0] : "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"} />
                    </CardHeader>

                    <CardBody className="text-center">
                        <Typography variant="h4" color="blue-gray" className="uppercase mb-2">
                            {name ?? " - "}
                        </Typography>
                        <Typography color="blue-gray" className="font-medium italic">
                            {nameLatin ?? " - "}
                        </Typography>
                    </CardBody>
                </Card>
            </Link>
        </>
    )
}
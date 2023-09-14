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
            <Link to={tag ? "tanaman/" + tag : ""} data-swup-animation="circle">
                <Card className="bg-green-100" data-aos="fade-left">
                    <CardHeader floated={false} className="h-32 md:h-40 lg:h-52">
                        <img className="h-full w-full object-cover transform scale-100 hover:scale-110 transition-transform duration-300" src={Array.isArray(images) ? images[0] : "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png"} />
                    </CardHeader>

                    <CardBody className="text-center">
                        <Typography variant="h4" color="blue-gray" className="uppercase mb-2">
                            {name ?? " - "}
                        </Typography>
                        <Typography color="blue-gray" className="font-medium italic" textGradient>
                            {nameLatin ?? " - "}
                        </Typography>
                    </CardBody>
                </Card>
            </Link>
        </>
    )
}
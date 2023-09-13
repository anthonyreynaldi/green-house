import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
  } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";

export default function PlantCard(){
    const handleElementClick = () => {
        // Programmatically trigger the Link's click event
        linkRef.current.click();
    };

    const linkRef = React.useRef();

    return (
        <>
            <Card className="bg-green-100" data-aos="fade-left">
                
                <Link to="test" className="to-circle" data-swup-animation="circle">sdfsdf</Link>

                <CardHeader floated={false} className="h-32 md:h-40 lg:h-52">
                    <img className="h-full w-full object-cover transform scale-100 hover:scale-110 transition-transform duration-300" src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80" alt="profile-picture" />
                </CardHeader>

                <CardBody className="text-center">
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                        Nama Tanaman
                    </Typography>
                    <Typography color="blue-gray" className="font-medium italic" textGradient>
                        Nama Latin
                    </Typography>
                </CardBody>
            </Card>
        </>
    )
}
import { Typography } from "@material-tailwind/react";

export default function PlantDescription(){
    return (
        <div data-aos="fade-up" data-aos-delay="300">
                <Typography variant="h1">Material Tailwind</Typography>
                <Typography className="text-xl italic">Material Tailwind</Typography>
                <div className="my-5"></div>
                <Typography variant="paragraph" >
                    Material Tailwind is an easy to use components library for Tailwind CSS
                    and Material Design. It provides a simple way to customize your
                    components, you can change the colors, fonts, breakpoints and everything
                    you need.
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit alias provident dicta vel corporis voluptatum cum officia quas quibusdam ipsum! Quam cumque tempora repudiandae maiores illo pariatur sint nam a?
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit alias provident dicta vel corporis voluptatum cum officia quas quibusdam ipsum! Quam cumque tempora repudiandae maiores illo pariatur sint nam a?
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit alias provident dicta vel corporis voluptatum cum officia quas quibusdam ipsum! Quam cumque tempora repudiandae maiores illo pariatur sint nam a?
                </Typography>
        </div>
    );
}
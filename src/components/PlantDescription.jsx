import { Typography } from "@material-tailwind/react";
import DOMPurify from 'dompurify';

export default function PlantDescription({name, nameLatin, description}){
    return (
        <div data-aos="fade-up" data-aos-delay="300">
                {/* Plant Name */}
                <Typography variant="h1">{name ?? "-"}</Typography>

                {/* Plant Latin Name */}
                <Typography className="text-xl italic">{nameLatin ?? "-"}</Typography>

                <div className="my-5"></div>

                {/* Description */}
                <div className="default-css" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description ?? " - ") }} />
        </div>
    );
}
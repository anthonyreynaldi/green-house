import { Typography } from "@material-tailwind/react";
import { PlantTable } from "../components/PlantTable";

export default function Admin(){
    return(
        <>
            <div className="grid mt-6">
                <PlantTable/>
            </div>
        </>
    );
}
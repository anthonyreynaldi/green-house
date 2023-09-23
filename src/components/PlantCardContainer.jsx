import { useEffect, useState } from "react";
import PlantCard from "./PlantCard"
import { Spinner, Typography } from "@material-tailwind/react";
import { getAllPlant } from "../utils/PlantDataUtils";

export default function PlantCardContainter(){
    const [plantsData, setPlantsData] = useState(null);
    const [isPlantExist, setIsPlantExist] = useState(true);

    useEffect(() => {
        getAllPlant().then((allPlants) => {
            if(allPlants){
                setPlantsData(allPlants);
            }else{
                setIsPlantExist(false);
            }
        })
    }, [])

    return (
    <>
        {
        isPlantExist ? 
            <>
                {
                    plantsData?
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-4 place-content-center overflow-x-hidden">
                        {plantsData.map((plant, i) => (
                            <PlantCard key={i} name={plant.name} nameLatin={plant.nameLatin} images={plant.images} tag={plant.tag}/>
                        ))}
                    </div>
                    :
                    <div className="w-full grid place-content-center">
                        <Spinner className="h-12 w-12 text-center" />
                    </div>
                }
            </>
            :
            // tanaman tidak ditemukan
            <div className="mt-5 mx-auto">
                <Typography variant="h3" className="text-center">Masih Belum Ada Tanaman</Typography>
            </div>
        }

            
    </>
    )
    
}
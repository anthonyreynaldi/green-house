import { useParams } from "react-router-dom";
import PlantDetailCarousel from "../components/PlantDetailCarousel";
import PlantDescription from "../components/PlantDescription";
import { useEffect, useState } from "react";
import { Spinner, Typography } from "@material-tailwind/react";
import { getPlant } from "../utils/PlantDataUtils";

export default function PlantDetail(){
    const { plantTag } = useParams()
    const [plantData, setPlantData] = useState(null);
    const [isPlantExist, setIsPlantExist] = useState(true);

    useEffect(() => {
        getPlant(plantTag).then((plantData) => {
            if(plantData){
                setPlantData(plantData);
            }else{
                setIsPlantExist(false);
            }
        });
    }, [plantTag])

    return(
        <>
            {
            isPlantExist ? 
                <>
                    {
                        plantData?
                        <div className="mt-5 grid grid-cols-1 gap-8 lg:grid-cols-2 place-content-center">
                            <PlantDetailCarousel images={plantData.images} />
                            <PlantDescription name={plantData.name} nameLatin={plantData.nameLatin} description={plantData.description}/>
                        </div>
                        :
                        <div className="mt-5 grid place-content-center">
                            <Spinner className="h-12 w-12 text-center" />
                        </div>
                    }
                </>
                    
                :
                // tanaman tidak ditemukan
                <div className="mt-5 mx-auto">                    
                    <Typography variant="h3" className="text-center">Tanaman Tidak Ditemukan</Typography>
                </div>
            }

            
        </>
    );
}
import { useEffect, useState } from "react";
import PlantCard from "./PlantCard"
import { plantsCollectionRef } from "../config/firebase";
import { getDocs } from "firebase/firestore";
import { Spinner, Typography } from "@material-tailwind/react";

export default function PlantCardContainter(){
    const plants = Array(5).fill(0)

    const [plantsData, setPlantsData] = useState(null);
    const [isPlantExist, setIsPlantExist] = useState(true);

    useEffect(() => {
        const getPlantsData = async () => {
            try {
                const querySnapshot = await getDocs(plantsCollectionRef);

                const allPlants = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }));
                
                if (querySnapshot.size > 0) {
                    setPlantsData(allPlants);
                    console.log(allPlants);
                } else {
                  // Document doesn't exist
                  setIsPlantExist(false);
                  console.log('No such document!');
                }
              } catch (error) {
                console.error('Error fetching document:', error);
              }
        }

        getPlantsData();
    }, [])

    return (
    <>
        {
        isPlantExist ? 
            <>
                {
                    plantsData?
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-4 place-content-center">
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
import { useParams } from "react-router-dom";
import PlantDetailCarousel from "../components/PlantDetailCarousel";
import PlantDescription from "../components/PlantDescription";
import { collectionName, db, plantsCollectionRef } from "../config/firebase";
import { CollectionReference, doc, getDocs, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Spinner, Typography } from "@material-tailwind/react";

export default function PlantDetail(){
    const { plantTag } = useParams()
    const [plantData, setPlantData] = useState(null);
    const [isPlantExist, setIsPlantExist] = useState(true);

    useEffect(() => {
        const getPlantData = async () => {
            try {
                const docRef = doc(db, collectionName, plantTag);
                const docSnapshot = await getDoc(docRef);
                
                if (docSnapshot.exists()) {
                    setPlantData(docSnapshot.data());
                    console.log(docSnapshot.data());
                } else {
                  // Document doesn't exist
                  setIsPlantExist(false);
                  console.log('No such document!');
                }
              } catch (error) {
                console.error('Error fetching document:', error);
              }
        }

        getPlantData();
    }, [])


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
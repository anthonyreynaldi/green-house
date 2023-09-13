import { useParams } from "react-router-dom";
import PlantDetailCarousel from "../components/PlantDetailCarousel";
import PlantDescription from "../components/PlantDescription";

export default function PlantDetail(){
    const { plantTag } = useParams()

    return(
        <>
            <div className="mt-5 grid grid-cols-1 gap-8 lg:grid-cols-2">
                <PlantDetailCarousel/>
                <PlantDescription/>
                <div>{ plantTag }</div>
            </div>

            
        </>
    );
}
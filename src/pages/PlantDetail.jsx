import { useParams } from "react-router-dom";

export default function PlantDetail(){
    const { plantTag } = useParams()

    return(
        <>
            <div>{ plantTag }</div>
            
        </>
    );
}
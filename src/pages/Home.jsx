import PlantCardContainter from "../components/PlantCardContainer";
import PlantCarousel from "../components/PlantCarousel";

export default function Home(){

    return (
    <>
        <div className="mt-5"></div>
        <PlantCarousel/>
        <div className="mt-5"></div>
        <PlantCardContainter/>
        <div className="mt-5"></div>
    </>
    );
}
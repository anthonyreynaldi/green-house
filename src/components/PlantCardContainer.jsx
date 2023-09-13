import PlantCard from "./PlantCard"

export default function PlantCardContainter(){
    const plants = Array(5).fill(0)

    return (
    <>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-4">
            {plants.map((val, i) => (
                <PlantCard key={i}/>
            ))}
        </div>
    </>
    )
    
}
import { Carousel } from "@material-tailwind/react";

export default function PlantDetailCarousel({images}){
    return (
        <>
            <Carousel
                className="rounded-xl max-w-screen-xl mx-auto h-96 bg-blue-gray-50 drop-shadow-2xl"
                data-aos="fade-left"
                navigation={({ setActiveIndex, activeIndex, length }) => (
                    <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                    {new Array(length).fill("").map((_, i) => (
                        <span
                        key={i}
                        className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                            activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                        }`}
                        onClick={() => setActiveIndex(i)}
                        />
                    ))}
                    </div>
                )}
                >

                {images?.map((image, i) => (
                    <img key={i}
                        src={image}
                        className="h-full w-full object-cover"
                    />
                ))}
            </Carousel>
        </>
    );
}
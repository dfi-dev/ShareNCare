import React from "react";
import PhotoCard from "./PhotoCard";

const images = [
    "https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/844167/pexels-photo-844167.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/1467300/pexels-photo-1467300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/1139040/pexels-photo-1139040.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2531709/pexels-photo-2531709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/1819650/pexels-photo-1819650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/2403251/pexels-photo-2403251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

const PhotoGrid = () => {
    return (

        <div className="flex flex-col items-center justify-center min-h-screen bg-black px-10 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl">
                 {/*md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 max-w-4xl mx-auto*/}
                {images.map((img, index) => (
                    <PhotoCard key={index} img={img} />
                ))}
            </div>
        </div>
    );
};

export default PhotoGrid;

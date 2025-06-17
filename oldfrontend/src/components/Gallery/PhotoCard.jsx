import React, { useState } from "react";
import { motion } from "framer-motion";

const PhotoCard = ({ img }) => {
    const [rotate, setRotate] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState(1);
    const [zIndex, setZIndex] = useState(1);

    const handleMouseMove = (e) => {
        const { offsetX, offsetY, target } = e.nativeEvent;
        const width = target.clientWidth;
        const height = target.clientHeight;

        const rotateY = ((offsetX / width) * 40 - 20).toFixed(2);
        const rotateX = ((offsetY / height) * -40 + 20).toFixed(2);

        setRotate({ x: rotateX, y: rotateY });
        setScale(1.8); // Enlarge on hover
        setZIndex(10); // Bring to front
    };

    const handleMouseLeave = () => {
        setRotate({ x: 0, y: 0 });
        setScale(1); // Reset size
        setZIndex(1); // Restore z-index
    };

    return (
        <motion.div
            className="relative w-36 h-36 bg-gray-300 rounded-lg shadow-lg overflow-hidden cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                transform: `perspective(500px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${scale})`,
                transition: "transform 0.2s ease-out",
                zIndex: zIndex, // Ensure the hovered card appears on top
                position: "relative",
            }}
        >
            <img
                src={img}
                alt="Photo"
                className="w-full h-full object-cover transition-all duration-300"
                style={{
                    filter: "grayscale(60%) contrast(110%) brightness(90%)", // **Only 40% desaturated, keeping colors alive**
                }}
                onMouseEnter={(e) => (e.target.style.filter = "grayscale(0%)")}
                onMouseLeave={(e) => (e.target.style.filter = "grayscale(40%) contrast(110%) brightness(90%)")}
            />
        </motion.div>
    );
};

export default PhotoCard;

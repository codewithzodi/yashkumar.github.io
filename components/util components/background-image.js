import React from 'react'

export default function BackgroundImage(props) {
    const bg_images = {
        "wall-1": "./images/wallpapers/kali-glitchsea.jpg",
        "wall-2": "./images/wallpapers/kali-geometric.png",
        "wall-3": "./images/wallpapers/1.jpg",
        "wall-4": "./images/wallpapers/2.jpg",
        "wall-5": "./images/wallpapers/3.png",
        "wall-6": "./images/wallpapers/4.png",
        "wall-7": "./images/wallpapers/5.png",
        "wall-8": "./images/wallpapers/6.png",
        "wall-9": "./images/wallpapers/7.jpg",
    };

    const bg = bg_images[props.img];

    return (
        <div style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundColor: "black" }} className="bg-ubuntu-img absolute -z-10 top-0 right-0 overflow-hidden h-full w-full">
        </div>
    )
}

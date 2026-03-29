import React from 'react';
import Clock from '../util components/clock';

export default function LockScreen(props) {

    const wallpapers = {
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

    if (props.isLocked) {
        window.addEventListener('click', props.unLockScreen);
        window.addEventListener('keypress', props.unLockScreen);
    };

    return (
        <div id="ubuntu-lock-screen" style={{ zIndex: "100" }} className={(props.isLocked ? " visible translate-y-0 " : " invisible -translate-y-full ") + " absolute outline-none bg-black transform duration-500 select-none top-0 right-0 overflow-hidden m-0 p-0 h-screen w-screen"}>
            <div style={{ backgroundImage: `url(${wallpapers[props.bgImgName]})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center" }} className="absolute top-0 left-0 w-full h-full transform z-20 blur-sm ">
            </div>
            <div className="w-full h-full z-50 overflow-hidden relative flex flex-col justify-center items-center text-white">
                <div className=" text-7xl">
                    <Clock onlyTime={true} />
                </div>
                <div className="mt-4 text-xl font-medium">
                    <Clock onlyDay={true} />
                </div>
                <div className=" mt-16 text-base">
                    Click or Press a key to unlock
                </div>
            </div>
        </div>
    )
}

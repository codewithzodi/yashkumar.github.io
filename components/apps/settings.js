import React from 'react';
import $ from 'jquery';

export function Settings(props) {
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

    let changeBackgroundImage = (e) => {
        props.changeBackgroundImage($(e.target).data("path"));
    }

    return (
        <div className={"w-full flex-col flex-grow z-20 max-h-full overflow-y-auto windowMainScreen select-none bg-ub-cool-grey"}>
            <div className="md:w-2/5 w-2/3 h-1/3 m-auto my-4 relative overflow-hidden rounded" style={{ backgroundImage: `url(${wallpapers[props.currBgImgName]})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center" }}>
            </div>
            <div className="flex flex-wrap justify-center items-center border-t border-gray-900 mt-4 p-4 gap-4">
                {
                    Object.keys(wallpapers).map((name, index) => {
                        return (
                            <div 
                                key={index} 
                                tabIndex="1" 
                                onFocus={changeBackgroundImage} 
                                data-path={name} 
                                className={((name === props.currBgImgName) ? " border-yellow-700 " : " border-transparent ") + " relative w-32 md:w-48 aspect-video outline-none border-4 border-opacity-80 rounded overflow-hidden cursor-pointer shadow-md bg-black transition duration-200"} 
                                style={{ backgroundImage: `url(${wallpapers[name]})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center" }}
                            >
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default Settings


export const displaySettings = () => {
    return <Settings> </Settings>;
}

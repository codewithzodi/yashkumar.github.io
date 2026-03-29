import React, { useState, useEffect } from "react";
import SmallArrow from "./small_arrow";

export default function Status() {
  const [cpu, setCpu] = useState(3);
  const [ram, setRam] = useState(74);
  const [upSpeed, setUpSpeed] = useState("0.2");
  const [downSpeed, setDownSpeed] = useState("0.0");

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random system activity
      setCpu(Math.floor(Math.random() * 15) + 1); // 1-15% CPU
      
      // Gradually shift RAM by -1, 0, or +1% keeping it around 70-80%
      setRam((prev) => {
        const newRam = prev + (Math.floor(Math.random() * 3) - 1);
        if (newRam > 85) return 85;
        if (newRam < 65) return 65;
        return newRam;
      });

      // Random network traffic spikes
      setUpSpeed((Math.random() * 2).toFixed(1)); // 0.0 - 2.0 kB/s
      setDownSpeed((Math.random() * 10).toFixed(1)); // 0.0 - 10.0 kB/s
    }, 2500); // update every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center">
      {/* System Stats Section */}
      <div className="flex justify-center items-center text-xs space-x-3 mr-4 hidden sm:flex text-gray-200">
        <span className="flex items-center">
          <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15 2H9v2H7V2H5v2H3v2H1v2h2v2H1v2h2v2H1v2h2v2h2v2h2v-2h6v2h2v-2h2v-2h2v-2h-2v-2h2v-2h-2V8h2V6h-2V4h-2V2h-2v2h-6V2zm3 16H6V6h12v12zm-3-9H9v6h6V9z"/>
          </svg>
          {cpu}%
        </span>
        <span className="flex items-center">
            <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22,7H2V17H22V7ZM20,15H4V9H20V15ZM6,10H8V14H6V10ZM10,10H12V14H10V10ZM14,10H16V14H14V10Z"/>
            </svg>
            {ram}%
        </span>
        <span className="flex items-center">
            <svg className="w-3.5 h-3.5 mr-1 pt-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15,3L15,7L8,7L8,10L1,5L8,0L8,3L15,3ZM9,21L9,17L16,17L16,14L23,19L16,24L16,21L9,21Z"/>
            </svg>
            19%
        </span>
        <span className="flex items-center font-mono w-16">
           ↑ {upSpeed} kB
        </span>
        <span className="flex items-center font-mono w-16">
           ↓ {downSpeed} kB
        </span>
      </div>

      {/* System Icons Section (WiFi, Audio, Battery) */}
      <div className="flex justify-center items-center border-b-2 border-transparent group-focus:border-ubb-orange transition duration-100 ease-in-out pb-1" style={{ marginBottom: '-6px' }}>
        <span className="mx-1.5">
          <img
            width="16px" height="16px"
            src="./themes/Yaru/status/network-wireless-signal-good-symbolic.svg"
            alt="ubuntu wifi"
            className="inline status-symbol w-4 h-4"
          />
        </span>
        <span className="mx-1.5">
          <img
            width="16px" height="16px"
            src="./themes/Yaru/status/audio-volume-medium-symbolic.svg"
            alt="ubuntu sound"
            className="inline status-symbol w-4 h-4"
          />
        </span>
        <span className="mx-1.5">
          <img
            width="16px" height="16px"
            src="./themes/Yaru/status/battery-good-symbolic.svg"
            alt="ubuntu battry"
            className="inline status-symbol w-4 h-4"
          />
        </span>
        <span className="mx-1">
          <SmallArrow angle="down" className=" status-symbol" />
        </span>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react'

const BOOT_LINES = [
    { text: "SYS_CORE_V9.4", delay: 0 },
    { text: "SECURE_BOOT_ENABLED", delay: 60 },
    { text: "BIOS Date 03/06/26 17:03:00 Ver 09.00.04", delay: 120 },
    { text: "CPU: Quantum Process Unit @ 4.2THz", delay: 200 },
    { text: "Memory Test: 64T OK", delay: 280 },
    { text: "BIOS Date 03/06/26 17:03:00 Ver 09.00.04", delay: 340 },
    { text: "INITIALIZING SYSTEM KERNEL...", delay: 420 },
    { text: "CPU: Quantum Process Unit @ 4.2THz", delay: 480 },
    { text: "Memory Test: 64T OK", delay: 540 },
    { text: "INITIALIZING SYSTEM KERNEL...", delay: 600 },
    { text: "Memory Test: 64T OK", delay: 650 },
    { text: "LOADING PYTHON MODULES... [OK]", delay: 720 },
    { text: "INITIALIZING SYSTEM KERNEL...", delay: 780 },
    { text: "LOADING PYTHON MODULES... [OK]", delay: 840 },
    { text: "MOUNTING AI ALGORITHMS... [OK]", delay: 920 },
    { text: "LOADING PYTHON MODULES... [OK]", delay: 980 },
    { text: "BYPASSING MAINFRAME SECURITY... [DONE]", delay: 1060 },
    { text: "MOUNTING AI ALGORITHMS... [OK]", delay: 1120 },
    { text: "MOUNTING AI ALGORITHMS... [OK]", delay: 1180 },
    { text: "BYPASSING MAINFRAME SECURITY... [DONE]", delay: 1240 },
    { text: "DECRYPTING CYBERSECURITY PROTOCOLS... [OK]", delay: 1340 },
    { text: "DECRYPTING CYBERSECURITY PROTOCOLS... [OK]", delay: 1400 },
    { text: "BYPASSING MAINFRAME SECURITY... [DONE]", delay: 1460 },
    { text: "DECRYPTING CYBERSECURITY PROTOCOLS... [OK]", delay: 1520 },
    { text: "ESTABLISHING SECURE CONNECTION...", delay: 1620 },
    { text: "ESTABLISHING SECURE CONNECTION...", delay: 1680 },
    { text: "ESTABLISHING SECURE CONNECTION...", delay: 1740 },
    { text: "COMPILING PORTFOLIO_DATA.SYS...", delay: 1840 },
    { text: "COMPILING PORTFOLIO_DATA.SYS...", delay: 1900 },
    { text: "COMPILING PORTFOLIO_DATA.SYS...", delay: 1960 },
    { text: "AUTHENTICATING USER: YASH_KUMAR", delay: 2080 },
    { text: "AUTHENTICATING USER: YASH_KUMAR", delay: 2140 },
    { text: "AUTHENTICATING USER: YASH_KUMAR", delay: 2200 },
];

const ACCESS_DELAY = 2400;

function getRandomHex() {
    return "0x" + Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase().padStart(6, '0');
}

function getLineColor(text) {
    if (text.includes("ACCESS GRANTED")) return "#00ff41";
    if (text.includes("AUTHENTICATING")) return "#facc15";
    if (text.includes("BYPASSING") || text.includes("DECRYPTING")) return "#f97316";
    if (text.includes("SECURE") || text.includes("ESTABLISHING")) return "#60a5fa";
    if (text.includes("MOUNTING") || text.includes("COMPILING")) return "#a78bfa";
    if (text.includes("LOADING") || text.includes("PYTHON")) return "#34d399";
    if (text.includes("KERNEL") || text.includes("CPU") || text.includes("Memory")) return "#94a3b8";
    return "#6b7280";
}

function BootingScreen(props) {
    const [visibleLines, setVisibleLines] = useState([]);
    const [showAccess, setShowAccess] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!props.visible) return;

        // Reset on re-open
        setVisibleLines([]);
        setShowAccess(false);
        setProgress(0);

        // Schedule each boot line
        const timers = BOOT_LINES.map((line, i) =>
            setTimeout(() => {
                setVisibleLines(prev => [...prev, { text: line.text, hex: getRandomHex(), id: i }]);
            }, line.delay)
        );

        // Show ACCESS GRANTED
        const accessTimer = setTimeout(() => {
            setShowAccess(true);
        }, ACCESS_DELAY);

        // Progress bar animation — reaches 100% over 2.8s
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) { clearInterval(progressInterval); return 100; }
                return prev + 1.5;
            });
        }, 40);

        return () => {
            timers.forEach(clearTimeout);
            clearTimeout(accessTimer);
            clearInterval(progressInterval);
        };
    }, [props.visible]);

    return (
        <div
            className={
                (props.visible || props.isShutDown ? "visible opacity-100" : "invisible opacity-0") +
                " absolute duration-500 select-none top-0 right-0 m-0 p-0 h-screen w-screen overflow-hidden"
            }
            style={{
                background: "#0a0a0a",
                zIndex: props.visible || props.isShutDown ? 100 : -20,
                fontFamily: "'Courier New', Courier, monospace",
            }}
        >
            {props.isShutDown ? (
                /* Shutdown screen: just a power button */
                <div className="w-full h-full flex items-center justify-center">
                    <div
                        className="bg-white rounded-full flex justify-center items-center w-12 h-12 hover:bg-gray-300 shadow-lg cursor-pointer"
                        onClick={props.turnOn}
                    >
                        <img width="32px" height="32px" className="w-8" src="./themes/Yaru/status/power-button.svg" alt="Power Button" />
                    </div>
                </div>
            ) : (
                <div className="w-full h-full flex flex-col p-4 md:p-8 overflow-hidden">

                    {/* Scrolling terminal lines */}
                    <div className="flex-1 overflow-hidden flex flex-col justify-end">
                        <div className="flex flex-col gap-0.5">
                            {visibleLines.map((line) => (
                                <div key={line.id} className="flex items-start gap-3 text-[10px] md:text-xs leading-relaxed">
                                    <span style={{ color: "#374151", minWidth: "80px" }}>{line.hex}</span>
                                    <span style={{ color: "#4b5563" }}>&gt;</span>
                                    <span style={{ color: getLineColor(line.text) }}>{line.text}</span>
                                </div>
                            ))}

                            {/* ACCESS GRANTED lines */}
                            {showAccess && (
                                <>
                                    {[...Array(5)].map((_, i) => (
                                        <div key={`access-${i}`} className="flex items-start gap-3 text-[10px] md:text-xs leading-relaxed">
                                            <span style={{ color: "#374151", minWidth: "80px" }}>{getRandomHex()}</span>
                                            <span style={{ color: "#4b5563" }}>&gt;</span>
                                            <span style={{ color: "#00ff41", fontWeight: "bold", textShadow: "0 0 8px #00ff41" }}>ACCESS GRANTED.</span>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>

                    {/* Bottom: progress bar */}
                    <div className="mt-6 flex flex-col items-center gap-3">
                        <div style={{
                            width: "200px",
                            height: "3px",
                            background: "#1a1a1a",
                            borderRadius: "999px",
                            overflow: "hidden",
                            border: "1px solid #1f2937"
                        }}>
                            <div style={{
                                width: `${progress}%`,
                                height: "100%",
                                background: "linear-gradient(90deg, #00ff41, #4ade80)",
                                boxShadow: "0 0 8px #00ff41",
                                borderRadius: "999px",
                                transition: "width 0.04s linear"
                            }} />
                        </div>
                        <div style={{ color: "#4b5563", fontSize: "10px", letterSpacing: "0.15em" }}>
                            {showAccess ? "SYSTEM READY" : "BOOTING..."}
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}

export default BootingScreen

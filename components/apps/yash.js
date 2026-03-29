import React, { Component } from 'react';
import ReactGA from 'react-ga4';

export class AboutYash extends Component {

    constructor() {
        super();
        this.screens = {};
        this.state = {
            screen: () => { },
            active_screen: "about",
            navbar: false,
        }
    }

    componentDidMount() {
        this.screens = {
            "about": <About />,
            "experience": <Experience />,
            "education": <Education />,
            "certifications": <Certifications />,
            "skills": <Skills />,
            "projects": <Projects />,
            "resume": <Resume />,
        }

        let lastVisitedScreen = localStorage.getItem("about-section");
        if (lastVisitedScreen === null || lastVisitedScreen === undefined) {
            lastVisitedScreen = "about";
        }

        this.changeScreen(document.getElementById(lastVisitedScreen));
    }

    changeScreen = (e) => {
        const screen = e.id || e.target.id;
        localStorage.setItem("about-section", screen);
        ReactGA.send({ hitType: "pageview", page: `/${screen}`, title: "Custom Title" });
        this.setState({
            screen: this.screens[screen],
            active_screen: screen
        });
    }

    showNavBar = () => {
        this.setState({ navbar: !this.state.navbar });
    }

    renderNavLinks = () => {
        const tabs = [
            { id: "about", name: "About Me", icon: "about.svg" },
            { id: "experience", name: "Experience", icon: "user-home.png" }, // reusing home icon or change if needed
            { id: "education", name: "Education", icon: "education.svg" },
            { id: "certifications", name: "Certifications", icon: "certifications.svg" },
            { id: "skills", name: "Skills", icon: "skills.svg" },
            { id: "projects", name: "Projects", icon: "projects.svg" },
            { id: "resume", name: "Resume", icon: "download.svg" },
        ];

        return (
            <>
                {tabs.map(tab => (
                    <div key={tab.id} id={tab.id} tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === tab.id ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-pointer outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5 transition-colors"}>
                        <img className=" w-3 md:w-4" alt={tab.name} src={`./themes/Yaru/${tab.icon.endsWith('.png') ? 'system' : 'status'}/${tab.icon}`} />
                        <span className=" ml-1 md:ml-2 text-gray-50 ">{tab.name}</span>
                    </div>
                ))}
            </>
        );
    }

    render() {
        return (
            <div className="w-full h-full flex bg-ub-cool-grey text-white select-none relative animate-fade-in">
                <div className="md:flex hidden flex-col w-1/4 md:w-1/5 text-sm overflow-y-auto windowMainScreen border-r border-black">
                    {this.renderNavLinks()}
                </div>
                <div onClick={this.showNavBar} className="md:hidden flex flex-col items-center justify-center absolute bg-ub-cool-grey rounded w-6 h-6 top-1 left-1 cursor-pointer">
                    <div className=" w-3.5 border-t border-white"></div>
                    <div className=" w-3.5 border-t border-white" style={{ marginTop: "2pt", marginBottom: "2pt" }}></div>
                    <div className=" w-3.5 border-t border-white"></div>
                    <div className={(this.state.navbar ? " visible animateShow z-30 " : " invisible ") + " md:hidden text-xs absolute bg-ub-cool-grey py-0.5 px-1 rounded-sm top-full mt-1 left-0 shadow border-black border border-opacity-20"}>
                        {this.renderNavLinks()}
                    </div>
                </div>
                <div className="flex flex-col w-3/4 md:w-4/5 justify-start items-center flex-grow bg-ub-grey overflow-y-auto windowMainScreen scroll-smooth">
                    {this.state.screen}
                </div>
            </div>
        );
    }
}

export default AboutYash;

export const displayAboutYash = () => {
    return <AboutYash />;
}

function About() {
    return (
        <div className="animate-slide-up w-full flex flex-col md:flex-row items-center justify-center pb-8 pt-8 px-4 md:px-12">

            {/* Left side text */}
            <div className="w-full md:w-1/2 flex flex-col items-start text-left order-2 md:order-1 mt-8 md:mt-0 lg:ml-8">
                <div className="text-lg md:text-3xl">
                    <div>Console log initialized. I'm <span className="font-bold text-ub-orange">Yash Kumar</span>,</div>
                    <div className="font-normal mt-2">a <span className="text-pink-600 font-bold">Python Developer & Cybersecurity Enthusiast!</span></div>
                </div>

                <div className="mt-6 relative pt-px bg-white w-32 md:w-48">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-0"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-0"></div>
                </div>

                <ul className="mt-6 space-y-4 leading-relaxed tracking-tight text-sm md:text-base emoji-list">
                    <li className="list-pc">Engineering resilient backend architectures, orchestrating scalable cloud deployments, and integrating intelligent AI models. Guarding systems against the void.</li>
                    <li className="list-building">Available for Cybersecurity & Python Developer Opportunities. Building secure and robust backend systems is my core strength.</li>
                    <li className="list-star">Feel free to hit me up <a className='text-ub-orange hover:underline cursor-pointer' href='mailto:kumar.yash200430@gmail.com'><u>@kumar.yash200430@gmail.com</u></a> :)</li>
                </ul>
            </div>

            {/* Right side image */}
            <div className="w-full md:w-1/2 flex justify-center items-center order-1 md:order-2 mt-4 md:mt-0">
                <div className="w-64 md:w-80 lg:w-[28rem] transform hover:scale-105 transition-transform duration-300">
                    <img className="w-full h-auto object-cover filter drop-shadow-2xl" src="./images/logos/yash.png" alt="Yash Kumar 3D Avatar" />
                </div>
            </div>

        </div>
    )
}

function Experience() {
    return (
        <div className="animate-slide-up w-full flex flex-col items-center pb-8">
            <div className=" font-medium relative text-2xl mt-8 md:mt-4 mb-4">
                Experience
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <ul className=" w-10/12 mt-4 ml-4 px-0 md:px-1 space-y-6">
                <li className="list-disc">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">Associate Technology Trainee</div>
                    <div className=" text-sm text-gray-400 mt-0.5">Mar 2026 – Present | Ghaziabad, Uttar Pradesh, India<br/><br/></div>
                </li>
                <li className="list-disc">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">Project Lead - Zod Cloud</div>
                    <div className=" text-sm text-gray-400 mt-0.5">Jan 2026 â€“ Present</div>
                    <div className=" text-sm md:text-base text-pink-500 font-semibold mb-1">VPS & Hosting Automation Platform</div>
                    <div className=" text-sm md:text-base text-gray-300">
                        Built a VPS and hosting platform using a TSX-based frontend and Python + MySQL backend. Integrated multiple payment gateways with an admin panel.
                    </div>
                </li>
                <li className="list-disc">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">Project Lead - AI Plant Disease Recognition</div>
                    <div className=" text-sm text-gray-400 mt-0.5">Sep 2025 â€“ Dec 2025 | Edunet Foundation / AICTE</div>
                    <div className=" text-sm md:text-base text-pink-500 font-semibold mb-1">Skills4Future Program</div>
                    <div className=" text-sm md:text-base text-gray-300">
                        Led development of an AI-based system to detect plant diseases from leaf images using CNN and EfficientNetB4. Coordinated the team and contributed directly to model development.
                    </div>
                </li>
                <li className="list-disc">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">Project Lead - Roamy</div>
                    <div className=" text-sm text-gray-400 mt-0.5">Jan 2025 â€“ Dec 2025 | Vishwakarma University</div>
                    <div className=" text-sm md:text-base text-pink-500 font-semibold mb-1">AI & Blockchain-Based Travel Assistant</div>
                    <div className=" text-sm md:text-base text-gray-300">
                        Led a team of 4 students, architecting and building the core backend workflows. Implemented intelligent recommendations and blockchain-based rewards.
                    </div>
                </li>
                <li className="list-disc">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">Cybernetics - Intelligent CCTV Surveillance</div>
                    <div className=" text-sm text-gray-400 mt-0.5">Jan 2025 â€“ Jun 2025 | Industrial Project</div>
                    <div className=" text-sm md:text-base text-pink-500 font-semibold mb-1">Real-time Object Detection</div>
                    <div className=" text-sm md:text-base text-gray-300">
                        Developed an AI-based CCTV surveillance system using YOLOv8, integrating trained models into a live monitoring and analysis workflow.
                    </div>
                </li>
            </ul>
        </div>
    )
}

function Education() {
    return (
        <div className="animate-slide-up w-full flex flex-col items-center pb-8">
            <div className=" font-medium relative text-2xl mt-8 md:mt-4 mb-4">
                Education
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <ul className=" w-10/12  mt-4 ml-4 px-0 md:px-1 space-y-6">
                <li className="list-disc">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">Vishwakarma University - VU</div>
                    <div className=" text-sm text-gray-400 mt-0.5">April 2022 - April 2026</div>
                    <div className=" text-sm md:text-base">Bachelor of Technology in Computer Engineering</div>
                    <div className="text-sm text-gray-300 font-bold mt-1">CGPA &nbsp; 7.54/10</div>
                </li>
                <li className="list-disc">
                    <div className=" text-lg md:text-xl mt-4 text-left font-bold leading-tight">Presidium School</div>
                    <div className=" text-sm text-gray-400 mt-0.5">2020 - 2022</div>
                    <div className=" text-sm md:text-base">Higher Secondary School</div>
                </li>
                <li className="list-disc">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">Ch. Chhabil Dass Public School</div>
                    <div className=" text-sm text-gray-400 mt-0.5">2008 - 2020</div>
                    <div className=" text-sm md:text-base">Secondary School</div>
                </li>
            </ul>
        </div>
    )
}

function Certifications() {
    const certs = [
        { "name": "IBM Full Stack Software Developer", "org": "IBM", "date": "May 2025", "id": "F1FI0GZGX684", "link": "https://www.coursera.org/account/accomplishments/professional-cert/certificate/F1FI0GZGX684" },
        { "name": "IT Fundamentals for Cybersecurity", "org": "IBM", "date": "Jan 2025", "id": "6EBVABMCZ1G1", "link": "https://www.coursera.org/account/accomplishments/specialization/certificate/6EBVABMCZ1G1" },
        { "name": "Programming with Google Go", "org": "Coursera", "date": "Feb 2025", "id": "BZV5T6PRSANK", "link": "https://coursera.org/share/3fe0f8f068776989374916db018e595b" },
        { "name": "Fundamentals of Computer Network Security", "org": "Coursera", "date": "Mar 2025", "id": "TC1WD5K9PH8L", "link": "https://coursera.org/share/e0ff8bc629d3fdd63aed7884584024b8" },
        { "name": "Introduction to Cybersecurity", "org": "Cisco Networking Academy", "date": "Sep 2025", "link": "https://www.credly.com/badges/59d1347d-4cf4-48e7-847a-760afa055221/linked_in_profile" },
        { "name": "Advanced Course on Green Skills and Artificial Intelligence", "org": "Edunet Foundation", "date": "Sep 2025", "id": "S4F25_194343", "link": "https://skills4future.in/certificate-verification-master-deck/S4F25_194343" },
        { "name": "Implementing a Data Warehouse with SQL Server 2022", "org": "LinkedIn", "date": "Nov 2024", "link": "https://www.linkedin.com/learning/certificates/3ad10c100e2e9ad323a45ca2aa6b6b82eb6fe0a36fed859a5fb438279d3bd80c" },
        { "name": "Predictive Analytics Essential Training: Data Mining", "org": "LinkedIn", "date": "Nov 2024", "link": "https://www.linkedin.com/learning/certificates/8b6d2ae272b85db7180a76c92321fde969efcca7f522c2835365e17d040b5330" },
        { "name": "Machine Learning and AI Foundations", "org": "LinkedIn", "date": "Jan 2024", "id": "706217bf...", "link": "https://lnkd.in/gG6EcfiN" },
        { "name": "Online Communication & Data Security", "org": "Wadhwani Foundation", "date": "Sep 2025", "id": "68c04b5...", "link": "https://web.certificate.wfglobal.org/en/certificate?certificateId=68c04b5204a0fba4a512ad33" },
    ];
    return (
        <div className="animate-slide-up w-full flex flex-col items-center pb-8">
            <div className=" font-medium relative text-2xl mt-8 md:mt-4 mb-4">
                Certifications
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <div className="w-10/12 flex flex-col gap-4 mt-4">
                {certs.map((c, i) => (
                    <a key={i} href={c.link} target="_blank" rel="noreferrer" className="flex flex-col bg-gray-50 bg-opacity-5 p-3 rounded-md hover:bg-opacity-10 transition-all border-l-4 border-ub-orange cursor-pointer hover:-translate-y-0.5 block">
                        <span className="font-bold text-lg">{c.name}</span>
                        <div className="flex justify-between text-sm text-gray-300 mt-1">
                            <span>{c.org}</span>
                            <span>{c.date}</span>
                        </div>
                        {c.id && <span className="text-xs text-gray-400 mt-2">ID: {c.id}</span>}
                    </a>
                ))}
            </div>
        </div>
    )
}

function Skills() {
    return (
        <div className="animate-slide-up w-full flex flex-col items-center pb-8">
            <div className=" font-medium relative text-2xl mt-8 md:mt-4 mb-4">
                Technical Capabilities
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <div className=" tracking-tight text-sm md:text-base w-10/12 text-center mt-4 leading-tight">
                Expertise focused broadly in <strong className="text-ubt-gedit-orange">Python, Cloud, Security & AI Integration!</strong>
            </div>

            <div className="w-10/12 flex flex-wrap gap-4 mt-8 justify-center">
                <SkillSet title="Languages" items={["Python", "Go (Golang)", "C", "SQL", "TypeScript", "MySQL"]} />
                <SkillSet title="Backend & APIs" items={["REST APIs", "Automation Scripts", "Microservices", "System Architecture", "Payment Gateways"]} />
                <SkillSet title="Data & AI" items={["Pandas", "NumPy", "TensorFlow", "YOLOv8", "CNN", "Streamlit", "Power BI", "Tableau"]} />
                <SkillSet title="Cloud & DevOps" items={["Azure", "GCP", "Linux (Ubuntu)", "Docker", "Git/GitHub", "Systemd", "UFW/IPtables"]} />
            </div>
        </div>
    )
}

function SkillSet({ title, items }) {
    return (
        <div className="bg-gray-50 bg-opacity-5 rounded w-full md:w-[48%] p-4 border border-gray-600 hover:border-ub-orange transition-colors">
            <h3 className="font-bold text-lg mb-3 text-pink-500">{title}</h3>
            <div className="flex flex-wrap gap-2">
                {items.map((i, idx) => (
                    <span key={idx} className="bg-black bg-opacity-30 rounded px-2 py-1 text-sm">{i}</span>
                ))}
            </div>
        </div>
    )
}

function Projects() {
    const project_list = [
        {
            name: "Zod Cloud â€“ VPS & Hosting Automation",
            date: "Jan 2026",
            link: "https://zodcloud.com/",
            description: [
                "Built a VPS and hosting platform using a TSX-based frontend and Python + MySQL backend.",
                "Integrated multiple payment gateways with an admin panel for easy configuration.",
                "Designed a relational MySQL database and an end-to-end order-to-deployment workflow."
            ],
            domains: ["python", "typescript", "mysql", "cloud infrastructure", "rest-api"]
        },
        {
            name: "AI Plant Disease Recognition System",
            date: "Sep 2025",
            link: "https://github.com/codewithzodi/plant-disease-classifier-webapp",
            description: [
                "An AI-based system to detect plant diseases from leaf images using CNN and EfficientNetB4.",
                "Led the team as Project Lead, coordinating model development, training, and evaluation under Skills4Future.",
                "System enables early disease detection to reduce crop loss for sustainable agriculture."
            ],
            domains: ["python", "tensorflow", "cnn", "efficientnet"]
        },
        {
            name: "Roamy: AI & Blockchain-Based Smart Travel",
            date: "Jun 2025",
            link: "https://github.com/codewithzodi/Roamy-Ai-Travel-Assitant",
            description: [
                "AI-powered travel assistant recommending destinations, hotels, and transport based on user preferences.",
                "Implemented a blockchain-based reward mechanism using smart contracts to incentivize user engagement.",
            ],
            domains: ["python", "nlp", "blockchain", "gemini-2.5"]
        },
        {
            name: "Intelligent CCTV Surveillance System",
            date: "Jan 2025",
            link: "https://github.com/codewithzodi/cybernetics",
            description: [
                "An AI-based CCTV surveillance system for real-time object detection using YOLOv8.",
                "Integrated trained models into a live monitoring and analysis workflow.",
            ],
            domains: ["python", "yolov8", "computer-vision"]
        }
    ];

    const tag_colors = {
        "python": "blue-400",
        "typescript": "blue-600",
        "mysql": "yellow-600",
        "tensorflow": "orange-500",
        "rest-api": "green-400",
        "cloud infrastructure": "cyan-400",
        "cnn": "pink-500",
        "efficientnet": "purple-500",
        "blockchain": "blue-300",
        "yolov8": "yellow-400",
        "computer-vision": "teal-400",
        "nlp": "indigo-400",
        "gemini-2.5": "sky-500"
    }

    return (
        <div className="animate-slide-up w-full flex flex-col items-center pb-8">
            <div className=" font-medium relative text-2xl mt-8 md:mt-4 mb-4">
                Projects Showcase
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>

            {
                project_list.map((project, index) => {
                    return (
                        <a key={index} href={project.link} target="_blank" rel="noreferrer" className="flex w-full md:w-5/6 flex-col px-4 mt-2">
                            <div className="w-full py-3 px-4 my-2 group border border-gray-50 border-opacity-10 rounded-lg hover:bg-gray-50 hover:bg-opacity-5 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl">
                                <div className="flex flex-wrap justify-between items-center">
                                    <div className='flex justify-center items-center'>
                                        <div className=" text-base md:text-lg font-bold group-hover:text-ub-orange transition-colors">{project.name}</div>
                                    </div>
                                    <div className="text-gray-300 font-light text-sm bg-black bg-opacity-20 px-2 py-1 rounded">{project.date}</div>
                                </div>
                                <ul className=" tracking-normal leading-tight text-sm font-light ml-4 mt-3">
                                    {
                                        project.description.map((desc, index) => {
                                            return <li key={index} className="list-disc mt-1 text-gray-100">{desc}</li>;
                                        })
                                    }
                                </ul>
                                <div className="flex flex-wrap items-start justify-start text-xs pt-4 mt-2 border-t border-gray-100 border-opacity-10">
                                    {
                                        (project.domains ?
                                            project.domains.map((domain, index) => {
                                                const colorClass = tag_colors[domain] || "gray-300";
                                                return <span key={index} className={`px-2 py-1 bg-black bg-opacity-40 text-${colorClass} m-1 rounded`}>{domain}</span>
                                            })
                                            : null)
                                    }
                                </div>
                            </div>
                        </a>
                    )
                })
            }
        </div>
    )
}

function Resume() {
    return (
        <div className="animate-slide-up h-full w-full flex flex-col items-center bg-gray-900 overflow-y-auto windowMainScreen scroll-smooth relative p-4 md:p-8">

            {/* Download Button - Floating or Fixed */}
            <div className="flex justify-between items-center w-full max-w-4xl mb-6">
                <h2 className="text-2xl font-bold border-b-2 border-ub-orange pb-1">Resume Preview</h2>
                <a
                    href="./files/Resume.pdf"
                    download="Yash_Kumar_Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-ub-orange hover:bg-opacity-90 text-white px-4 py-2 rounded-md shadow-lg flex items-center gap-2 transition-all font-bold group"
                >
                    <img src="./themes/Yaru/status/download.svg" className="w-5 h-5 invert group-hover:animate-bounce" alt="Download" />
                    Download PDF
                </a>
            </div>

            {/* Resume Document Container */}
            <div className="w-full max-w-4xl bg-white text-gray-900 rounded-sm shadow-2xl p-6 md:p-12 mb-10 selection:bg-ub-orange selection:text-white">

                {/* Header */}
                <header className="border-b-2 border-gray-200 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                        <h1 className="text-4xl font-extrabold text-black">Yash Kumar</h1>
                        <p className="text-xl text-ub-orange font-semibold mt-1">Python Developer & Cybersecurity Enthusiast</p>
                    </div>
                    <div className="mt-4 md:mt-0 text-sm text-gray-600 flex flex-col items-start md:items-end">
                        <p className="flex items-center gap-2">
                            <span className="font-bold">Email:</span>
                            <a href="mailto:kumar.yash200430@gmail.com" className="hover:text-ub-orange underline">kumar.yash200430@gmail.com</a>
                        </p>
                        <p className="flex items-center gap-2 mt-1">
                            <span className="font-bold">Location:</span> Ghaziabad, UP, India
                        </p>
                        <p className="flex items-center gap-2 mt-1">
                            <span className="font-bold">LinkedIn:</span>
                            <a href="#" className="hover:text-ub-orange underline">linkedin.com/in/yashkumar</a>
                        </p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column - Main Details */}
                    <div className="md:col-span-2 space-y-8">

                        {/* Summary */}
                        <section>
                            <h3 className="text-lg font-bold text-gray-900 border-l-4 border-ub-orange pl-3 mb-4 uppercase tracking-wider">Professional Summary</h3>
                            <p className="text-gray-700 leading-relaxed text-sm">
                                Engineering resilient backend architectures, orchestrating scalable cloud deployments, and integrating intelligent AI models.
                                Focused on building secure and robust systems with expertise in Python development and cybersecurity.
                            </p>
                        </section>

                        {/* Experience */}
                        <section>
                            <h3 className="text-lg font-bold text-gray-900 border-l-4 border-ub-orange pl-3 mb-4 uppercase tracking-wider">Work Experience</h3>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-bold text-gray-900">Associate Technology Trainee</h4>
                                        <span className="text-xs font-bold text-ub-orange whitespace-nowrap ml-2">Mar 2026 - Present</span>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-600 italic">ORITSO Pvt. Ltd. (Internship)</p>
                                    <p className="text-xs text-gray-500 mb-1 leading-normal">Ghaziabad, Uttar Pradesh, India</p>
                                </div>

                                <div>
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-bold text-gray-900">Project Lead - Zod Cloud</h4>
                                        <span className="text-xs font-bold text-ub-orange whitespace-nowrap ml-2">Jan 2026 - Present</span>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-600 italic">VPS & Hosting Automation Platform</p>
                                    <p className="text-xs text-gray-700 mt-1 leading-normal">Built a VPS platform using TSX frontend and Python + MySQL backend. Integrated multiple payment gateways and an admin panel for dynamic configuration.</p>
                                </div>

                                <div>
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-bold text-gray-900">Project Lead - AI Plant Disease</h4>
                                        <span className="text-xs font-bold text-ub-orange whitespace-nowrap ml-2">Sep 2025 - Dec 2025</span>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-600 italic">Skills4Future Program</p>
                                    <p className="text-xs text-gray-700 mt-1 leading-normal">Developed an AI-based system to detect plant diseases from leaf images using CNN and EfficientNetB4. Coordinated model development and evaluation steps.</p>
                                </div>
                            </div>
                        </section>

                        {/* Education */}
                        <section>
                            <h3 className="text-lg font-bold text-gray-900 border-l-4 border-ub-orange pl-3 mb-4 uppercase tracking-wider">Education</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between items-start text-sm">
                                        <h4 className="font-bold">Vishwakarma University (VU)</h4>
                                        <span className="text-xs font-bold text-ub-orange whitespace-nowrap ml-2">2022 - 2026</span>
                                    </div>
                                    <p className="text-xs">B.Tech in Computer Engineering</p>
                                    <p className="text-xs font-bold text-gray-600">CGPA: 7.54/10</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column - Skills & Extras */}
                    <div className="space-y-8">

                        {/* Core Skills */}
                        <section>
                            <h3 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-1 mb-3 uppercase">Core Skills</h3>
                            <div className="flex flex-wrap gap-1.5">
                                {["Python", "Go", "SQL", "TypeScript", "REST APIs", "Azure", "GCP", "Linux", "Docker", "Machine Learning", "Cybersecurity"].map(skill => (
                                    <span key={skill} className="bg-gray-100 px-2 py-0.5 rounded text-[10px] font-bold text-gray-700 border border-gray-200">{skill}</span>
                                ))}
                            </div>
                        </section>

                        {/* Recent Certifications */}
                        <section>
                            <h3 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-1 mb-3 uppercase">Certification Highlights</h3>
                            <ul className="text-[11px] space-y-2 text-gray-700">
                                <li><span className="font-bold text-ub-orange">IBM:</span> Full Stack Software Developer</li>
                                <li><span className="font-bold text-ub-orange">Coursera:</span> IT Fundamentals for Cybersecurity</li>
                                <li><span className="font-bold text-ub-orange">Google:</span> Programming with Go</li>
                                <li><span className="font-bold text-ub-orange">Cisco:</span> Intro to Cybersecurity</li>
                            </ul>
                        </section>

                        {/* Languages */}
                        <section>
                            <h3 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-1 mb-3 uppercase">Languages</h3>
                            <div className="text-xs space-y-1">
                                <div className="flex justify-between"><span>Hindi</span><span className="text-gray-400">Native</span></div>
                                <div className="flex justify-between"><span>English</span><span className="text-gray-400">Professional</span></div>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Footer Message */}
                <footer className="mt-12 pt-6 border-t border-gray-100 text-center text-[10px] text-gray-400 italic">
                    This is an interactive preview. Click the "Download PDF" button for the official document.
                </footer>
            </div>
        </div>
    )
}

"use client"

import crm from '../../public/crm-1.jpg'
import { motion } from "framer-motion";
import contracts from '../../public/landing/contracts.png'
import './pipeline.css'

import SlideItem from './slideItem'


import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import SidebarMenu from './menu'

import { resourcesData, eventsData, dashboardData, clientPortalData } from './data'
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/pagination";
import SwiperClass from "swiper";
import { useEffect, useRef, useState } from "react"
import Link from 'next/link'
const words = [
    "Wedding Flowers",
    "Elegant Bouquets",
    "Timeless Decor",
    "Floral Arrangements",
    "Romantic Roses",
    "Wedding Bliss",
    "Bridal Blooms",
    "Ceremony Chic",
    "Reception Flowers",
    "Dreamy Aisles",
    "Petal Perfection",
];
const Services = [
    {
        // img: RecipeBuilder,
        alt: "recipe builder icon",
        title: "Recipe Builder",
        des: "Vendors can create receipts for each arrangement, specifying the flowers required. Once an order is placed, they’ll know exactly what flowers to purchase to assemble the arrangement.",
        // hoverImage: RecipeBuilderImage,
    },
    {
        // img: ProposalBuilder,
        alt: "proposal builder icon",
        title: "Proposal Builder",
        des: "Vendors can post a customizable proposal builder—a tailored contact form that connects directly with the CRM. This tool adds clients to the system and generates proposals seamlessly.",
        // hoverImage: ProposalBuilderImage,
    },
    {
        // img: ContractSigning,
        alt: "contract signing icon",
        title: "Contract Signing",
        des: " Vendors’ clients can review and sign contracts directly within the platform, streamlining the agreement process.",
        // hoverImage: ContractSigningImage,
    },
    {
        // img: AiEmailAssistance,
        alt: "ai email assistance icon",
        title: "Ai Email Assistance",
        des: "An AI-powered email assistant helps florists craft professional and timely email replies, saving time and enhancing customer communication.",
        // hoverImage: AiEmailAssistantImage,
    },
];

const BuildPipeline = () => {
    const [active, setActive] = useState("Add Arrangement")
    const [activeMain, setActiveMain] = useState("ArrangementsandIngredients")
    const swiperRef = useRef<SwiperClass | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const maxTitlesToShow = 3;

    const [activeIndex, setActiveIndex] = useState(0);
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0);


    const [activeImage, setActiveImage] = useState(crm)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isGoingDown, setIsGoingDown] = useState(true);
    const [animationRunning, setAnimationRunning] = useState(true);
    const MEETING_LINK = "https://calendly.com/chasin619/30min"
    useEffect(() => {
        if (!animationRunning) return;
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                let nextIndex;
                if (isGoingDown) {
                    nextIndex = prevIndex + 1;
                    if (nextIndex >= Services.length) {
                        nextIndex = prevIndex - 1;
                        setIsGoingDown(false);
                    }
                } else {
                    nextIndex = prevIndex - 1;
                    if (nextIndex < 0) {
                        nextIndex = prevIndex + 1;
                        setIsGoingDown(true);
                    }
                }
                return nextIndex;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [isGoingDown, animationRunning]);

    console.log(currentTitleIndex)

    useEffect(() => {
        const nextButton = document.querySelector(".swiper-button-next-custom") as HTMLElement | null;
        const prevButton = document.querySelector(".swiper-button-prev-custom") as HTMLElement | null;

        if (nextButton && prevButton && swiperRef.current) {
            nextButton.addEventListener("click", () => swiperRef.current?.slideNext());
            prevButton.addEventListener("click", () => swiperRef.current?.slidePrev());
        }

        return () => {
            if (nextButton && prevButton) {
                nextButton.removeEventListener("click", () => { });
                prevButton.removeEventListener("click", () => { });
            }
        };
    }, []);

    const tabs = [
        { key: "ArrangementsandIngredients", label: "Arrangements and Ingredients", defaultActive: "Add Arrangement" },
        { key: "ProposalBuilder", label: "Proposal Builder", defaultActive: "Event Details" },
        { key: "clientportal", label: "Client Portal", defaultActive: "Client Portal" },
    ];

    const handleTabClick = (tabKey: any, defaultActive: any) => {
        setActiveMain(tabKey);
        setActive(defaultActive);
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        if (!swiperRef.current) return;

        const handleSlideChange = () => {
            const newIndex = swiperRef.current!.realIndex;
            setActiveIndex(newIndex);

            const newCurrentTitleIndex = Math.max(0, newIndex - Math.floor(maxTitlesToShow / 2));
            setCurrentTitleIndex(newCurrentTitleIndex);
        };

        swiperRef.current.on("slideChange", handleSlideChange);
        return () => {
            swiperRef.current?.off("slideChange", handleSlideChange);
        };
    }, [maxTitlesToShow]);




    const handleNavClick = (index: number) => {
        console.log("Clicked index:", index);

        setActiveIndex(index);
        swiperRef.current?.slideTo(index);
        const newCurrentTitleIndex = Math.max(0, index - Math.floor(maxTitlesToShow / 2));
        setCurrentTitleIndex(newCurrentTitleIndex);
    };



    return (
        <div className="md:py-10 py-4 px-4 md:mt-32  mt-32   md:px-20">
            <div className="flex flex-col gap-1 lg:gap-7">

                <h2 className="font-medium lg:text-[32px] text-2xl text-center tracking-[-1.2px]">
                    Everything your wedding flowers Business needs to get it done.
                </h2>
                {/* <h3 className="font-light lg:text-[24px] text-sm text-center tracking-[-1.2px]">
                    Tools for every client interaction
                </h3> */}
            </div>

            <div className="md:mx-40 md:mt-20 mt-8 py-4 md:px-6 rounded-lg px-6 bg-gray-100 hidden md:flex items-center justify-between relative">
                {tabs.map(({ key, label, defaultActive }) => {
                    const isActive = activeMain === key;

                    return (
                        <motion.button
                            key={key}
                            onClick={() => handleTabClick(key, defaultActive)}
                            className={`relative md:py-5 md:w-80 px-2 rounded-lg transition-colors duration-300 ${isActive ? "text-blue-500 bg-white" : "text-gray-700 bg-transparent"
                                }`}
                        >
                            {label}

                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-white rounded-lg -z-10"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                />
                            )}
                        </motion.button>
                    );
                })}
            </div>


            <div className="md:hidden mt-6 z-10 relative">
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-4 relative py-3 bg-white text-gray-700 rounded-lg flex items-center  justify-center border border-gray-300"
                >
                    {tabs.find((tab) => tab.key === activeMain)?.label || "Select an Option"}
                    <span className=" absolute right-0">{isDropdownOpen ? "▲" : "▼"}</span>
                </button>

                {isDropdownOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-0 mt-2 flex items-center justify-center flex-col w-full bg-gray-200 border border-gray-300 rounded-lg shadow-lg"
                    >
                        {tabs.map(({ key, label, defaultActive }) => (
                            <li
                                key={key}
                                onClick={() => handleTabClick(key, defaultActive)}
                                className={`px-4 py-3 text-center w-full cursor-pointer transition-colors ${activeMain === key ? "bg-white" : "hover:bg-gray-100"
                                    }`}
                            >
                                {label}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </div>

            <div className="flex mt-8 items-start md:flex-row  md:gap-8 flex-col justify-start">
                <div className="pipeline-sidebar  ">
                    {activeMain === "ArrangementsandIngredients" &&
                        <SidebarMenu active={active} items={resourcesData} setActive={setActive} />
                    }
                    {activeMain === "ProposalBuilder" &&
                        <SidebarMenu active={active} items={eventsData} setActive={setActive} />
                    }
                    {activeMain === "clientportal" &&
                        <SidebarMenu active={active} items={clientPortalData} setActive={setActive} />
                    }

                </div>



                <div className=" md:block hidden  flex-1    mt-8">
                    {active === "dashboard" && (
                        <div className="p-2 w-full mySwiper">

                            <Swiper
                                modules={[Navigation, Pagination]}
                                spaceBetween={20}
                                slidesPerView={1}
                                pagination={{ clickable: true }}
                                navigation={true}
                                breakpoints={{
                                    640: { slidesPerView: 1 },
                                    1024: { slidesPerView: 1 },
                                    1280: { slidesPerView: 1 },
                                }}
                                style={{ maxWidth: "700px", position: 'relative', paddingBottom: '40px' }}
                                className="w-full h-auto mx-auto"
                            >
                                {dashboardData.map((item, index) => (
                                    <SwiperSlide key={index} className="p-4 rounded-lg">
                                        <SlideItem
                                            image={item.image}
                                            title={item?.titleFull}
                                            description={item.description}
                                            link={MEETING_LINK}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    )}


                    {activeMain === "ProposalBuilder" && (
                        <div className="p-2 w-full">
                            {eventsData
                                .filter((event) => event.title === active)
                                .map((event, index) => (
                                    <SlideItem
                                        key={index}
                                        image={event.image}
                                        title={event.title}
                                        description={event.description}
                                        link={MEETING_LINK}
                                    />
                                ))}
                        </div>
                    )}


                    {activeMain === "ArrangementsandIngredients" && (
                        <div className="p-2 w-full">
                            {resourcesData
                                .filter((event) => event.title === active)
                                .map((event, index) => (
                                    <SlideItem
                                        key={index}
                                        image={event.image}
                                        title={event?.titleFull}
                                        description={event.description}
                                        link={MEETING_LINK}
                                    />
                                ))}
                        </div>
                    )}
                    {/* mobile version  */}
                    {activeMain === "ArrangementsandIngredients" && (
                        <div className="block mySwiper flex-2 md:hidden">
                            <Swiper
                                modules={[Navigation, Pagination]}
                                spaceBetween={20}
                                slidesPerView={1}
                                autoplay={{ delay: 5000 }}
                                loop={true}
                                navigation={true}
                                pagination={{ clickable: true }}
                                style={{ maxWidth: 450, position: 'relative', paddingBottom: '40px' }}
                                className="h-auto mx-auto"
                            >
                                {resourcesData.map((item, index) => (
                                    <SwiperSlide key={index} className="p-4 rounded-lg">
                                        <SlideItem
                                            image={item.image}
                                            title={item?.titleFull}
                                            description={item.description}
                                            link={MEETING_LINK}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    )}

                    {activeMain === "clientportal" && (
                        <div className="p-2 w-full">
                            {clientPortalData
                                .filter((event) => event.title === active)
                                .map((event, index) => (
                                    <SlideItem
                                        key={index}
                                        image={event.image}
                                        title={event.title}
                                        description={event.description}
                                        link={MEETING_LINK}
                                    />
                                ))}
                        </div>
                    )}


                    {active === "signContracts" && <div>
                        <img className='rounded-lg' src={contracts.src} alt="" />
                        <div className='flex items-center justify-center flex-col gap-4'>
                            <span className='font-medium lg:text-[40px] text-[25px] text-primary  w-full text-center tracking-[-1.2px]'>
                                Contract
                            </span>
                            <span className='flex justify-center items-center text-sm  text-gray-500 mt-2'>
                                The Contracts section streamlines agreement handling by
                                allowing businesses to create, send, and manage contracts digitally.
                                Clients can review and
                                sign documents within the platform, ensuring a seamless, paperless,
                                and efficient process
                            </span>
                            <Link target='_blank' href={MEETING_LINK}>
                                <button
                                    className={`px-2 py-2 rounded-md text-lg font-medium transition-all bg-[#5C2AC8] text-white `}

                                >
                                    Learn more
                                </button>

                            </Link>
                        </div>

                    </div>}

                </div>

                <div className='md:hidden block relative flex-1    mt-8'>
                    {activeMain === "ArrangementsandIngredients" && (
                        <div className="block mySwiper flex-2 md:hidden relative">
                            <div className="flex justify-center transition-transform duration-300 ease-in-out space-x-4 mb-4">
                                {resourcesData
                                    .slice(currentTitleIndex, currentTitleIndex + maxTitlesToShow)
                                    .map((item, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleNavClick(currentTitleIndex + index)}
                                            className={`text-sm px-3 py-2 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-110 ${currentTitleIndex + index === activeIndex
                                                ? "text-blue-500 font-bold"
                                                : "text-gray-500"
                                                }`}
                                            style={{ transitionDelay: `${index * 100}ms` }}
                                        >
                                            {item.title}
                                        </button>
                                    ))}
                            </div>


                            <Swiper
                                onSwiper={(swiper) => {
                                    swiperRef.current = swiper;

                                    swiper.on("slideChange", () => {
                                        const newIndex = swiper.realIndex;
                                        console.log("Slide changed, new index:", newIndex);
                                        setActiveIndex(newIndex);

                                    });
                                }}
                                modules={[Navigation, Pagination]}
                                spaceBetween={20}
                                slidesPerView={1}
                                autoplay={{ delay: 8000 }}
                                loop={true}
                                navigation={{
                                    nextEl: ".swiper-button-next-custom",
                                    prevEl: ".swiper-button-prev-custom",
                                }}
                                pagination={{ clickable: true }}
                                style={{ maxWidth: "90vw", position: "relative", paddingBottom: "40px" }}
                                className="h-auto mx-auto"
                            >
                                {resourcesData.map((item, index) => (
                                    <SwiperSlide key={index} className="p-2 rounded-lg">
                                        <SlideItem
                                            image={item.image}
                                            title={item?.titleFull}
                                            description={item.description}
                                            link={MEETING_LINK}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* Navigation Arrows */}
                            <button className="swiper-button-prev-custom absolute left-0 top-[460px] transform -translate-y-1/2 z-10 bg-white shadow-md p-3 rounded-lg">
                                {`< `}
                            </button>
                            <button className="swiper-button-next-custom absolute right-0  top-[460px] transform -translate-y-1/2 z-10 bg-white shadow-md p-3 rounded-lg">
                                {">"}
                            </button>
                        </div>
                    )}

                    {activeMain === "ProposalBuilder" && (
                        <div className="block mySwiper flex-2 md:hidden relative">
                            <div className="flex justify-center relative transition-transform duration-300 ease-in-out space-x-4 mb-4">
                                {eventsData
                                    .slice(currentTitleIndex, currentTitleIndex + maxTitlesToShow)
                                    .map((item, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleNavClick(currentTitleIndex + index)}
                                            className={`text-sm px-3 py-2 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-110 ${currentTitleIndex + index === activeIndex
                                                ? "text-blue-500 font-bold"
                                                : "text-gray-500"
                                                }`}
                                            style={{ transitionDelay: `${index * 100}ms` }}
                                        >
                                            {item.title}
                                        </button>
                                    ))}
                            </div>


                            <Swiper
                                onSwiper={(swiper) => {
                                    swiperRef.current = swiper;

                                    swiper.on("slideChange", () => {
                                        const newIndex = swiper.realIndex;
                                        console.log("Slide changed, new index:", newIndex);
                                        setActiveIndex(newIndex);

                                    });
                                }}
                                modules={[Navigation, Pagination]}
                                spaceBetween={20}
                                effect='fade'
                                slidesPerView={1}
                                // autoplay={{ delay: 8000 }}
                                loop={true}
                                navigation={{
                                    nextEl: ".swiper-button-next-custom",
                                    prevEl: ".swiper-button-prev-custom",
                                }}
                                pagination={{ clickable: true }}
                                style={{ maxWidth: "90vw", position: "relative", paddingBottom: "10px" }}
                                className="h-auto mx-auto"
                            >
                                {eventsData.map((item, index) => (
                                    <SwiperSlide key={index} className="p-2 rounded-lg">
                                        <SlideItem
                                            image={item.image}
                                            title={item?.titleFull}
                                            description={item.description}
                                            link={MEETING_LINK}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* Navigation Arrows */}
                            <button className="swiper-button-prev-custom absolute left-0 top-[460px] transform -translate-y-1/2 z-10 bg-white shadow-md p-3 rounded-lg">
                                {`< `}
                            </button>
                            <button className="swiper-button-next-custom absolute right-0  top-[460px] transform -translate-y-1/2 z-10 bg-white shadow-md p-3 rounded-lg">
                                {">"}
                            </button>
                        </div>
                    )}

                    {activeMain === "clientportal" && (
                        <div className="block mySwiper flex-2 md:hidden relative">
                            <div className="flex justify-center transition-transform duration-300 ease-in-out space-x-4 mb-4">
                                {clientPortalData
                                    .slice(currentTitleIndex, currentTitleIndex + maxTitlesToShow)
                                    .map((item, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleNavClick(currentTitleIndex + index)}
                                            className={`text-sm px-3 py-2 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-110 ${currentTitleIndex + index === activeIndex
                                                ? "text-blue-500 font-bold"
                                                : "text-gray-500"
                                                }`}
                                            style={{ transitionDelay: `${index * 100}ms` }}
                                        >
                                            {item.title}
                                        </button>
                                    ))}
                            </div>


                            <Swiper
                                onSwiper={(swiper) => {
                                    swiperRef.current = swiper;

                                    swiper.on("slideChange", () => {
                                        const newIndex = swiper.realIndex;
                                        console.log("Slide changed, new index:", newIndex);
                                        setActiveIndex(newIndex);

                                    });
                                }}
                                modules={[Navigation, Pagination]}
                                spaceBetween={20}
                                slidesPerView={1}
                                autoplay={{ delay: 8000 }}
                                loop={true}
                                navigation={{
                                    nextEl: ".swiper-button-next-custom",
                                    prevEl: ".swiper-button-prev-custom",
                                }}
                                pagination={{ clickable: true }}
                                style={{ maxWidth: "90vw", position: "relative", paddingBottom: "40px" }}
                                className="h-auto mx-auto"
                            >
                                {clientPortalData.map((item, index) => (
                                    <SwiperSlide key={index} className="p-2 rounded-lg">
                                        <SlideItem
                                            image={item.image}
                                            title={item?.titleFull}
                                            description={item.description}
                                            link={MEETING_LINK}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* Navigation Arrows */}
                            <button className="swiper-button-prev-custom absolute left-0 top-[460px] transform -translate-y-1/2 z-10 bg-white shadow-md p-3 rounded-lg">
                                {`< `}
                            </button>
                            <button className="swiper-button-next-custom absolute right-0  top-[460px] transform -translate-y-1/2 z-10 bg-white shadow-md p-3 rounded-lg">
                                {">"}
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>

    )
}

export default BuildPipeline
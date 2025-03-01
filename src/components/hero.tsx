"use client"

import React from "react";
import Image from "next/image";
import Herobg from "@/../public/images/hero-bg.webp";
import Capterra from "@/../public/images/capterra.png";
import SoftwareAdvice from "@/../public/images/software-advice.png";
import GetApp from "@/../public/images/get-app.png";
import Star from "@/../public/images/star.png";
import { useRouter } from "next/navigation";
import Link from "next/link";


const rating = [
  {
    img: Capterra,
    rate: "4.9",
    star: Star,
    alt: "capterra image",
    starAlt: "star image",
    width: 119,
    height: 30,
  },
  {
    img: SoftwareAdvice,
    rate: "4.9",
    star: Star,
    alt: "software advice image",
    starAlt: "star image",
    width: 170,
    height: 30,
  },
  {
    img: GetApp,
    rate: "4.9",
    star: Star,
    alt: "get app image",
    starAlt: "star image",
    width: 119,
    height: 30,
  },
];

export default function Hero() {
  const router = useRouter()
  const MEETING_LINK = "https://calendly.com/chasin619/30min"

  return (
    <div className="lg:h-[100vh] h-[1050px] w-full hero-bg relative  md:mt-[80px] sm:mt-20 mt-14">
      <div className="hero-gradient"></div>
      <div className="hero-gradient !top-[-950px] !left-[-1280px] !w-[1807px] !h-[1767px]"></div>
      <div className="hero-gradient  !top-[-1300px] !left-[-1630px] !w-[2464px] !h-[2410px]"></div>
      <div className="xl:w-[1200px] w-[90%] m-auto flex lg:flex-row flex-col justify-beween pt-[83px] relative z-[1]">
        <div className="lg:w-[90%] md:mt-[38px] gap-9 flex flex-col">
          <h1 className="font-semibold text-white lg:text-[55px] text-[40px] lg:leading-[90px] leading-[52px]">
            Streamline Your Floral Design Business
          </h1>
          <p className="font-medium lg:text-lg leading-[30px] text-[15px] text-white">
            Manage all sides of your business — floral recipes, rental decor,
            and everything in between. Book a free demo to see our floral
            business software in action.
          </p>
          <button onClick={() => router.push(MEETING_LINK)} className="bg-white md:w-[211px] lg:inline hidden w-[170px] h-[56px] rounded-[10px] font-medium text-base text-[#5C2AC8] hover:bg-transparent hover:text-white transition-all duration-300 border-2 border-white">
            Book a Free Demo
          </button>
        </div>
        <div className="mt-6 lg:mt-0 flex flex-col m-auto lg:w-1/2 w-full lg:items-end items-center justify-center">
          <Image src={Herobg} width={476} height={440} alt="hero-bg" />
          <div className="flex flex-row justify-between items-center mt-[36px] sm:gap-9 gap-4">
            {rating.map((item, index) => (
              <div
                key={index}
                className="h-[63px] flex flex-col justify-center items-center relative"
              >
                <Image
                  className="filter brightness-0 invert sm:w-full w-32"
                  src={item.img}
                  width={item.width}
                  height={item.height}
                  alt={item.alt}
                />
                <div className="flex sm:w-[130px] items-center h-[28px] absolute bottom-0">
                  <p className="text-white opacity-70 font-normal sm:text-[19px] text-sm font-outfit mr-1 sm:mt-[34px] mt-4">
                    {item.rate}
                  </p>
                  <div className="flex sm:mt-[34px] mt-[16px]">
                    {Array(5)
                      .fill("")
                      .map((_, starIndex) => (
                        <Image
                          key={starIndex}
                          src={item.star}
                          width={18}
                          height={16}
                          alt={item.starAlt}
                          className="sm:mr-1 mr-[2px] sm:w-full w-[13px]"
                        />
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white absolute z-10 md:top-[550px] top-[850px]   h-[80px] mt-[60px] rounded-[20px]  xl:w-[1200px] w-full flex md:flex-row flex-col justify-around md:gap-0 gap-5 md:p-0 p-5 items-center shadow-[0px_3px_32px_16px_#00000026]">
          <h2 className="font-outfit md:text-start text-center capitalize tracking-[-1.2px] font-normal lg:text-[28px] text-[20px]">
            See how easy it is for brides to create proposals with You
          </h2>
          <Link target="_blank" href={"https://www.wpro.ai/dashboard/events/create?vendorId=1&clientLink=true"}> <button className="xl:w-[276px] flex  w-[150px] group md:h-[56px] md:p-0 p-2 rounded-lg bg-primary text-white justify-center items-center hover:bg-white hover:text-primary border-2 border-primary transition-all duration-300 tracking-[-0.6px]">
            Try now
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="md:ms-[24px] ms-4 stroke-white group-hover:stroke-primary transition-all duration-300"
            >
              <path
                d="M7.93335 2L14 7.63333L7.93335 13.2667"
                stroke="current"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="bevel"
              />
              <path
                d="M1 7.4012H13.1333"
                stroke="current"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="bevel"
              />
            </svg>
          </button>
          </Link>

        </div>
      </div>
    </div>
  );
}

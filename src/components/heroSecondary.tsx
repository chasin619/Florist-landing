import React from "react";
import LearnmoreBg from "@/../public/images/learnmore-bg.png";
import Image from "next/image";
import Link from "next/link";

export default function heroSecondary() {
  const MEETING_LINK = "https://calendly.com/chasin619/30min"

  return (
    <div className="lg:h-[85vh] h-[100vh] w-full hero-bg relative overflow-hidden md:mt-[80px] mt-20 flex">
      <div className="hero-gradient !top-[-777px] !left-[-1090px]"></div>
      <div className="hero-gradient !top-[-1050px] !left-[-1380px] !w-[1807px] !h-[1767px]"></div>
      <div className="hero-gradient-secondary bottom-[-777px] right-[-1090px]"></div>
      <div className="hero-gradient-secondary bottom-[-1050px] right-[-1380px] !w-[1807px] !h-[1767px]"></div>
      <div className="xl:w-[1200px] w-[90%] m-auto flex lg:flex-row flex-col justify-between relative z-[1]">
        <div className="lg:w-1/2 lg:gap-9 gap-[19px] flex flex-col">
          <h1 className="font-semibold text-white md:text-[50px] text-[40px] md:leading-[70px] leading-[52px]">
            Elevate Your Brand with Luxurious Web Presence
          </h1>
          <p className="font-medium md:text-lg text-sm leading-[30px] text-white">
            Manage all sides of your business — floral recipes, rental decor,
            and everything in between. Book a free demo to see our floral
            business software in action.
          </p>
          <Link href={MEETING_LINK}>
            <button className="bg-white md:w-[211px] lg:block hidden w-[170px] h-[56px] rounded-[10px] font-medium text-base text-[#5C2AC8] hover:bg-transparent hover:text-white transition-all duration-300 border-2 border-white">
              Book a Free Demo
            </button>
          </Link>

        </div>
        <div className="mt-[24px] lg:mt-0 flex flex-col m-auto md:w-1/2 items-end justify-center">
          <Image
            src={LearnmoreBg}
            width={558}
            height={449}
            alt="learnmore bg"
          />
        </div>
      </div>
    </div>
  );
}

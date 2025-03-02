"use client"

import Image from "next/image";
import CoinImage from "../../public/images/coin.webp";
import React from "react";
import { useRouter } from "next/navigation";

export default function Prefooter() {
  const MEETING_LINK = "https://calendly.com/chasin619/30min"

  const router = useRouter()
  return (
    <div className="bg-[#5C2AC8] w-full">
      <div className="xl:w-[1200px] w-[90%] m-auto h-[380px]">
        <div className="flex relative justify-between items-center w-full">
          <div className="flex flex-col justify-between relative z-10 h-[380px] lg:py-5 py-5">
            <h2 className="font-semibold text-[50px] leading-[70px] lg:w-[365px] w-[350px] text-white capitalize">
              Easy to start. Option to pay monthly or in full.
            </h2>
            <button onClick={() => router.push(MEETING_LINK)} className="bg-white text-[16px] font-medium text-[#5C2AC8] w-[191px] absolute lg:left-[320px] left-[150px] bottom-[25px] lg:bottom-[85px] h-[50px] rounded-[10px] hover:bg-primary hover:text-white border-2 border-white transition-all duration-300">
              Get A Demo
            </button>
          </div>
          <div className="absolute lg:block hidden right-0 h-full w-[555px]">
            <Image
              className="w-full h-full"
              src={CoinImage}
              width={555}
              height={399}
              alt="coin image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

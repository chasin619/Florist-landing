"use client"
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

export default function Prefooter() {
  const router = useRouter()
  return (
    <div className=" bg-[#5C2AC8] lg:mt-[101px] mt-[42px]">
      <div className="xl:w-[1200px] w-[90%] lg:h-[399px] h-full m-auto flex">
        <div className="flex relative justify-between items-center w-full">
          <div className="flex flex-col justify-between relative z-10 lg:h-[65%] h-[350px] lg:py-0 py-5">
            <h2 className="font-semibold text-[28px] md:leading-[70px] lg:w-[364px] text-white capitalize">
              Start for free, grow for real
            </h2>
            <button onClick={() => router.push(`/register?planName=Free`)} className="bg-white text-[16px] font-medium text-[#5C2AC8] w-[191px] h-[50px] rounded-[10px] hover:bg-primary hover:text-white border-2 border-white transition-all duration-300">
              Get Started Free
            </button>
            <p className="custom-text-outline font-semibold text-[16px] text-white">
              No Credit Card Required
            </p>
          </div>
          {/* <div className="absolute right-0 w-full h-full md:w-[555px] lg:block hidden">
            <Image
              className="w-full h-full"
              src={CoinImage}
              width={555}
              height={399}
              alt="coin image"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}

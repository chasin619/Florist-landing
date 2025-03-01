"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import { LeftArrowSvg, RightArrowSvg } from "@/assets/svgs";

interface SliderProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  slidesPerView?: number;
  showControls?: boolean;
  autoplay?: boolean;
}

const Slider = <T,>({
  data,
  renderItem,
  slidesPerView = 3,
  showControls = true,
  autoplay = true,
}: SliderProps<T>) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const swiperRef = useRef<any>(null);

  return (
    <div className="w-full overflow max-h-80 relative">
      {showControls && (
        <button
          className="absolute left-[-10px] md:left-[-70px] z-10 bg-white p-4 w-10 h-10 md:w-14 md:h-14 rounded-full shadow-lg transition-transform transform -translate-y-1/2 top-1/2 flex items-center justify-center"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <Image src={LeftArrowSvg} alt="Left Arrow" />
        </button>
      )}
      <Swiper
        modules={[Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView={slidesPerView}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        loop
        autoplay={autoplay ? { delay: 2000, disableOnInteraction: false } : false}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          350: {
            slidesPerView: 1,
          },
          660: {
            slidesPerView: 2,
          },
          900: {
            slidesPerView: 3,
          },
          1240: {
            slidesPerView: 3,
          },
        }}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} style={{ width: "90%" }}>
            {renderItem(item, index)}
          </SwiperSlide>
        ))}
      </Swiper>
      {showControls && (
        <button
          className="absolute right-[12px] md:right-0 z-10 bg-white p-4 w-10 h-10 md:w-14 md:h-14 rounded-full shadow-lg transition-transform transform -translate-y-1/2 top-1/2 flex items-center justify-center"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <Image src={RightArrowSvg} alt="Right Arrow" />
        </button>
      )}
    </div>
  );
};

export default Slider;

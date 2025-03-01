"use client";

import React, { useState, useRef } from "react";
import { Flex, Text } from "@radix-ui/themes";
import { softwareData } from "@/utils/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  Navigation,
} from "swiper/modules";
import Image from "next/image";
import { LeftArrowSvg, RightArrowSvg } from "@/assets/svgs";
import "swiper/css";
import "swiper/css/navigation";

const AboutSoftware = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const swiperRef = useRef<any>(null);

  return (
    <section className="flex justify-center items-center px-4 md:px-8">
      <Flex
        justify="between"
        align="center"
        maxWidth="1380px"
        direction="column"
        mx="auto"
        px="6"
        py="4"
        gap="6"
        className="w-full"
      >
        <Flex direction="column" gap="5" className="text-center md:text-left">
          <Text
            className="text-primaryGray !tracking-[.4px]"
            as="p"
            size={{ md: "8", initial: "7" }}
          >
            <Text className="text-green">Weddings</Text> and{" "}
            <Text className="text-green">Proposals</Text> software
          </Text>
          <Text as="p" size="5" color="gray" mt="2">
            Provides all resources to be aware of each events changes:
          </Text>
        </Flex>
        <Flex
          justify="center"
          align="center"
          style={{
            height: "400px",
            width: "100%",
            position: "relative",
          }}
          className="w-full"
        >
          <button
            className="absolute left-[-45px] md:left-[-70px] z-10 bg-white p-4 w-10 h-10 md:w-14 md:h-14 rounded-full shadow-lg transition-transform transform -translate-y-1/2 top-1/2 flex items-center justify-center"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <Image src={LeftArrowSvg} alt="Left Arrow" />
          </button>
          <Swiper
            modules={[Pagination, Scrollbar, A11y, Autoplay, Navigation]}
            slidesPerView={1}
            spaceBetween={10}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            breakpoints={{
              660: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              900: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1240: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            className="w-full mt-32"
          >
            {softwareData?.map((item, index) => (
              <SwiperSlide key={index} className="w-full">
                <Flex
                  direction="column"
                  align="center"
                  className="rounded-lg shadow-lg transition-all hover:shadow-xl focus:outline-none w-full"
                >
                  <Image
                    src={item.image}
                    unoptimized={true}
                    alt={item.name}
                    width="370"
                    height="200"
                    objectFit="cover"
                    objectPosition="top"
                    className="max-h-52 w-full object-cover"
                  />
                  <Flex px="6" py="4" gap="4" direction="column">
                    <Text
                      as="p"
                      mt="2"
                      className="text-gray-700 !tracking-[.4px] md:text-2xl text-xl"
                    >
                      {item.name}
                    </Text>
                    <Text as="p" color="gray">
                      {item.description}
                    </Text>
                  </Flex>
                </Flex>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            className="absolute right-[-45px] md:right-[-60px] z-10 bg-white p-4 w-10 h-10 md:w-14 md:h-14 rounded-full shadow-lg transition-transform transform -translate-y-1/2 top-1/2 flex items-center justify-center"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <Image src={RightArrowSvg} alt="Right Arrow" />
          </button>
        </Flex>
      </Flex>
    </section>
  );
};

export default AboutSoftware;

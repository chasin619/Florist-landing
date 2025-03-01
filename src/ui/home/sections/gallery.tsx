"use client";

import { Slider } from "@/ui/home/components/slider";
import { galleryData } from "@/utils/constants";
import { Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";

const Gallery = () => {
  return (
    <section className="flex justify-center">
      <Flex
        direction="column"
        justify="center"
        align="center"
        my="9"
        gap="4"
        px="6"
        maxWidth="1380px"
        width="100%"
      >
        <Flex direction="column" justify="center" align="center">
          <Text
            className="text-primaryGray !tracking-[.4px] block"
            size={{ md: "8", initial: "7" }}
          >
            Easy to Start!
          </Text>
          <Text size="5" color="gray" mt="4" className="block">
            We provide finished gallery of flowers, items, colors, and recipes
          </Text>
        </Flex>
        <Flex mt="7" direction="column" gap="6" width="100%">
          <Slider
            data={galleryData}
            autoplay={false}
            slidesPerView={3}
            renderItem={(item, index) => {
              const { title, orangeText, photoPath } = item;
              return (
                <Flex
                  key={index}
                  align="center"
                  direction="column"
                  maxWidth="350px"
                >
                  {photoPath && (
                    <Image
                      src={photoPath}
                      alt="Public Recipe"
                      width={300}
                      height={300}
                      unoptimized={true}
                      className="rounded-xl md:w-80 xs:w-56"
                      priority
                    />
                  )}
                  <Flex justify="center" direction="column">
                    <Text
                      as="p"
                      mt="4"
                      className="text-primaryGray !tracking-[.4px] md:text-3xl xs:text-2xl"
                    >
                      {orangeText}{" "}
                      <Text as="span" className="text-orange" mt="1">
                        {title}
                      </Text>
                    </Text>
                  </Flex>
                </Flex>
              );
            }}
          />
        </Flex>
      </Flex>
    </section>
  );
};

export default Gallery;

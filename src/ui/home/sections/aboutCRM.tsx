"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Flex, Text } from "@radix-ui/themes";
import { softwareCRMData } from "@/utils/constants";

const AboutCRM = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const images = [
    "/crm-1.jpg",
    "/crm-2.jpg",
    "/crm-3.jpg",
    "/crm-4.jpg",
    "/crm-5.jpg",
  ];

  return (
    <section>
      <Flex
        justify="between"
        align="center"
        maxWidth="1380px"
        mx="auto"
        px="6"
        pt={{ initial: "0", md: "9" }}
        gap="6"
        direction={{ initial: "column-reverse", md: "row" }}
      >
        <Image
          src={images[activeIndex]}
          alt="Inquiry Form Image"
          width="700"
          height="700"
          className="xs:hidden md:block"
        />
        <Flex maxWidth={{ initial: "100%", md: "50%" }} direction="column">
          <Text
            className="text-primaryGray !tracking-[.4px]"
            as="p"
            size={{ md: "8", initial: "7" }}
          >
            Inquiry Form in a Form of{" "}
            <Text className="text-orange">Proposal Builder</Text> feature
          </Text>
          {softwareCRMData.map((feature, index) => (
            <Text
              as="p"
              key={index}
              color="gray"
              my="5"
              className={`border-l-[3px] text-base border-l-orange pl-6 ${
                activeIndex === index ? "opacity-100" : "opacity-45"
              }`}
              onMouseEnter={() => setActiveIndex(index)}
            >
              {feature.name}
            </Text>
          ))}
        </Flex>
      </Flex>
    </section>
  );
};

export default AboutCRM;

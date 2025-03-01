"use client";

import React, { useState } from "react";
import { Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import { inquiryFormData } from "@/utils/constants";

const InquiryForm = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const images = [
    "/inquiry-form.png",
    "/inquiry-form-2.png",
    "/inquiry-form-3.png",
    "/inquiry-form-4.png",
  ];

  return (
    <section>
      <Flex
        justify="between"
        align="center"
        maxWidth="1380px"
        mx="auto"
        mt={{ initial: "8", md: "0" }}
        px="6"
        py={{ initial: "0", md: "4" }}
        gap="6"
        direction={{ initial: "column-reverse", md: "row" }}
      >
        <Flex maxWidth={{ initial: "100%", md: "50%" }} direction="column">
          <Text
            className="text-primaryGray !tracking-[.4px]"
            as="p"
            size={{ md: "8", initial: "7" }}
          >
            Inquiry Form in a Form of{" "}
            <Text className="text-green">Proposal Builder</Text> feature
          </Text>

            {inquiryFormData.map((feature, index) => (
              <Text
                as="p"
                key={index}
                color="gray"
                my="5"
                className={`text-base border-l-[3px] border-l-green pl-6 ${
                  activeIndex === index ? "opacity-100" : "opacity-45"
                }`}
                style={{ lineHeight: '28px' }}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {feature.name}
              </Text>
            ))}
            <Text as="p" color="gray" mt="6" size="3">
              All at the convenience of her own home. Without calling, emailing,
              meeting
            </Text>
        </Flex>
        <Image
          src={images[activeIndex]}
          alt="Inquiry Form Image"
          width="700"
          height="700"
          className="xs:hidden md:block"
        />
      </Flex>
    </section>
  );
};

export default InquiryForm;

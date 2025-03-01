import React from "react";
import { Flex, Text } from "@radix-ui/themes";

const Video = () => {
  return (
    <section className="flex justify-center">
      <Flex
        direction="column"
        justify="center"
        align="center"
        my="4"
        gap="4"
        px="6"
        maxWidth="1380px"
        width="100%"
      >
        <Text
          className="text-primaryGray !tracking-[.4px] block"
          size={{ md: "8", initial: "7" }}
        >
          How it works?
        </Text>
        <video
          className="rounded-lg shadow-lg"
          controls
          width="1000"
          height="450"
        >
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Flex>
    </section>
  );
};

export default Video;

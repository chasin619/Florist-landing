import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Flex, Text } from "@radix-ui/themes";
import { FacebookSvg, InstagramSvg, TwitterSvg } from "@/assets/svgs";

const Footer = () => {
  return (
    <footer className="md:px-20 xs:px-6 py-10 border-t border-[color(display-p3 0 0 0 / .608)]">
      <Flex
        justify="between"
        align="center"
        direction={{ initial: "column", sm: "row" }}
        gap={{ initial: "6", sm: "0" }}
      >
        <Text color="gray">&copy; {new Date().getFullYear()} WPRO</Text>
        <nav className="md:w-1/2 xs:w-full flex justify-between items-center xs:gap-4">
          <Link href="/blog">
            <Text color="gray">Blog</Text>
          </Link>
          <Link href="/about">
            <Text color="gray">About</Text>
          </Link>
          <Link href="/terms">
            <Text color="gray">Terms</Text>
          </Link>
          <Link href="/privacy">
            <Text color="gray">Piracy</Text>
          </Link>
          <Link href="/help">
            <Text color="gray">Help</Text>
          </Link>
        </nav>
        <Flex gap="4">
          <Image src={FacebookSvg} alt="Facebook Image" />
          <Image src={TwitterSvg} alt="Twitter Image" />
          <Image src={InstagramSvg} alt="Facebook Image" />
        </Flex>
      </Flex>
    </footer>
  );
};

export default Footer;

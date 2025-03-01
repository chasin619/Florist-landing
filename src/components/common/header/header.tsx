"use client";

import React, { useState } from "react";
import { Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { MenuSvg } from "@/assets/svgs";
import Image from "next/image";

interface HeaderProps {
  openModal?: () => void;
}

export default function Header({ openModal }: HeaderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onMenuClose = () => {
    setIsOpen(false);
  };

  return (
    <header className="bg-white md:px-20 xs:px-6 py-6 fixed top-0 left-0 w-full z-50 shadow-md">
      <Flex justify="between" align="center">
        <Link href="/">
          <Text size="4" weight="light" className="!tracking-[.25em]">
            WPRO
          </Text>
        </Link>
        <nav>
          <ul className="items-center flex-row gap-14 md:flex xs:hidden">
            <Link href="/help">Help</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/" onClick={openModal}>
              Log in
            </Link>
            <Link href="/register">Register</Link>
          </ul>
          <Image
            src={MenuSvg}
            alt="Menu Icon"
            className="xs:flex md:hidden"
            onClick={() => setIsOpen(true)}
          />
          <div
            className={`bg-white fixed w-full h-screen top-0 right-0 flex items-center flex-col pt-9 pb-5 z-50 transition-opacity duration-500 ${
              isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Flex width="85%">
              <Text
                size="5"
                weight="light"
                align="center"
                className="!tracking-[.25em] w-full ml-16"
              >
                WPRO
              </Text>
              <div
                className="cursor-pointer self-start ml-7"
                onClick={onMenuClose}
              >
                <div className="relative w-6 h-6">
                  <span className="absolute block w-full h-[2px] bg-black rotate-45 top-1/2 left-0 transform -translate-y-1/2"></span>
                  <span className="absolute block w-full h-[2px] bg-black -rotate-45 top-1/2 left-0 transform -translate-y-1/2"></span>
                </div>
              </div>
            </Flex>
            <ul className="flex items-center flex-col gap-6 flex-1 justify-center">
              <Link href="/help" onClick={onMenuClose} className="text-xl">
                Help
              </Link>
              <Link href="/contact" onClick={onMenuClose} className="text-xl">
                Contact
              </Link>
              <Link
                href="/"
                onClick={() => {
                  openModal && openModal();
                  onMenuClose();
                }}
                className="text-xl"
              >
                Log in
              </Link>
              <Link href="/register" onClick={onMenuClose} className="text-xl">
                Register
              </Link>
            </ul>
          </div>
        </nav>
      </Flex>
    </header>
  );
}

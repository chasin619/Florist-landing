"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import BarsIcon from "../../public/icons/bars.svg";
import XIcon from "../../public/icons/x.svg";

function NavbarSecondary() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const MEETING_LINK = "https://calendly.com/chasin619/30min"

  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(target) &&
        !target.closest(".bars-icon")
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-[0px_3px_32px_16px_#00000026] z-[2] md:h-[80px] w-full top-0 fixed h-20 flex justify-center items-center">
      <div className="xl:w-[1200px] w-[90%] mx-auto">
        <div className="flex-1 flex items-center justify-between">
          <Link
            href="/"
            className="text-primary md:text-[40px] text-4xl font-semibold"
          >
            WPRO
          </Link>
          <div className="block sm:hidden">
            {isSidebarOpen ? (
              <Image
                onClick={toggleSidebar}
                src={XIcon}
                width={35}
                height={35}
                alt="bars icon"
                className="bars-icon"
              />
            ) : (
              <Image
                onClick={toggleSidebar}
                src={BarsIcon}
                width={35}
                height={35}
                alt="bars icon"
                className="bars-icon"
              />
            )}
          </div>

          {/* Sidebar for Mobile */}
          <div
            ref={sidebarRef}
            className={`${isSidebarOpen ? "translate-x-0" : "translate-x-full"
              } fixed top-20 right-0 bg-[#FFFFFF] w-[250px] h-full transition-transform duration-300 ease-in-out sm:hidden `}
          >
            <ul className="flex flex-col items-center space-y-4 mt-6">
              <li className="bg-primary w-[191px] hover:bg-white border-2 cursor-pointer transition-all duration-300 border-primary text-white hover:text-primary hover:border-primary h-[50px] rounded-[10px] flex justify-center items-center">
                <Link href="/wedding-florist-software/contact_us" className="font-medium text-base">
                  Contact us
                </Link>
              </li>
              <li className="bg-white border-2 border-primary w-[191px] h-[50px] rounded-[10px] flex justify-center items-center hover:bg-primary hover:text-white text-primary cursor-pointer transition-all duration-300">
                <Link href={MEETING_LINK} className="font-medium text-base">
                  Get a Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:block sm:ml-6">
            <ul className="flex space-x-4">
              <li className="bg-primary w-[191px] hover:bg-white border-2 cursor-pointer transition-all duration-300 border-primary text-white hover:text-primary hover:border-primary h-[50px] rounded-[10px] flex justify-center items-center">
                <Link href="/wedding-florist-software/contact_us" className="font-medium text-base">
                  Contact us
                </Link>
              </li>
              <li className="bg-white border-2 border-primary w-[157px] h-[50px] rounded-[10px] flex justify-center items-center hover:bg-primary hover:text-white text-primary cursor-pointer transition-all duration-300">
                <Link href={MEETING_LINK} className="font-medium text-base">
                  Get a Demo
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarSecondary;

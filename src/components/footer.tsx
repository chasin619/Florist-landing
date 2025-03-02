import React from "react";
import Image from "next/image";
import Link from "next/link";
import FacebookIcon from "../../public/icons/facebook.png";
import TwitterIcon from "../../public/icons/twitter.png";
import LinkedinIcon from "../../public/icons/linkedin.png";
import InstagramIcon from "../../public/icons/instagram.png";

export default function footer() {
  return (
    <footer className="bg-secondary md:h-[75px] md:p-0 p-4 h-[59px] w-full">
      <div className="xl:w-[1200px] w-[90%] h-full m-auto flex flex-row md:gap-0 gap-4 text-white justify-between items-center">
        <p className="font-outfit font-normal text-[15px] tracking-[-0.1px] opacity-70">
          Copyright © 2025 wPro
        </p>
        <div className="lg:flex hidden gap-[30px]">
          <Link
            href="#"
            className="font-outfit font-normal text-[15px] hover:text-gray-300 transition-all duration-300 opacity-70 tracking-[-0.1px] "
          >
            Admin
          </Link>
          <Link
            href="/terms_of_services"
            className="font-outfit font-normal text-[15px] hover:text-gray-300 transition-all duration-300 opacity-70 tracking-[-0.1px] "
          >
            Terms
          </Link>
          <Link
            href="/blog"
            className="font-outfit font-normal text-[15px] hover:text-gray-300 transition-all duration-300 opacity-70 tracking-[-0.1px] "
          >
            Blogs
          </Link>
          <Link
            href="/privacy_policy"
            className="font-outfit font-normal text-[15px] hover:text-gray-300 transition-all duration-300 opacity-70 tracking-[-0.1px] "
          >
            Privacy
          </Link>
          <Link
            href="#"
            className="font-outfit font-normal text-[15px] hover:text-gray-300 transition-all duration-300 opacity-70 tracking-[-0.1px] "
          >
            Websites
          </Link>
        </div>
        <div className="flex lg:gap-[31px] gap-6">
          <Link href="#">
            <Image
              src={TwitterIcon}
              width={17}
              height={15}
              alt="twitter icon"
            />
          </Link>
          <Link href="#">
            <Image
              src={FacebookIcon}
              width={17}
              height={15}
              alt="facebook icon"
            />
          </Link>
          <Link href="#">
            <Image
              src={InstagramIcon}
              width={17}
              height={15}
              alt="instagram icon"
            />
          </Link>
          <Link href="#">
            <Image
              src={LinkedinIcon}
              width={17}
              height={15}
              alt="linkedin icon"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}

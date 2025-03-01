"use client";

import { FacebookSvg, InstagramSvg, TwitterSvg } from "@/assets/svgs";
import Image from "next/image";
import React from "react";

interface ContentSectionProps {
  htmlContent: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({ htmlContent }) => {
  // const handleCopy = () => {
  //   navigator.clipboard.writeText(window.location.href);
  // };

  return (
    <div className="lg:px-16 px-4 lg:my-12 mb-16 flex gap-48">
      <div className="hidden md:block">
        <p className="text-xl text-black">Share</p>
        <div className="flex flex-col items-start gap-4 mt-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full cursor-pointer bg-[#f0f0f0] flex items-center justify-center">
              <Image src={InstagramSvg} alt="Instagram Image" />
            </div>
            <span className="font-medium">Instagram</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full cursor-pointer bg-[#f0f0f0] flex items-center justify-center">
              <Image src={FacebookSvg} alt="Facebook Image" />
            </div>
            <span className="font-medium">Facebook</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full cursor-pointer bg-[#f0f0f0] flex items-center justify-center">
              <Image src={TwitterSvg} alt="Twitter Image" />
            </div>
            <span className="font-medium">Tiktok</span>
          </div>
          {/* <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full cursor-pointer bg-[#f0f0f0] flex items-center justify-center"
              onClick={handleCopy}
            >
              <FontAwesomeIcon
                icon={faCopy}
                className="h-6 text-black hover:text-[#18799B] transition-colors duration-200"
              />
            </div>
            <span className="font-medium">Copy link</span>
          </div> */}
        </div>
      </div>
      <div
        className="md:text-lg text-base text-primaryGray leading-relaxed lg:max-w-[75%] max-w-full"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      ></div>
    </div>
  );
};

export default ContentSection;

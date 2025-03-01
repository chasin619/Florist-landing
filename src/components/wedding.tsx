"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import MacImage from "@/../public/images/mac.webp";
import RecipeBuilder from "@/../public/icons/recipe-builder.png";
import ProposalBuilder from "@/../public/icons/proposal-builder.png";
import ContractSigning from "@/../public/icons/contract-signing.png";
import AiEmailAssistance from "@/../public/icons/ai-email-assistance.png";
import WeddingImage from "@/../public/images/wedding-image.webp";
import RecipeBuilderImage from "@/../public/images/recipe-builder.webp";
import ProposalBuilderImage from "@/../public/images/proposal-builder.webp";
import ContractSigningImage from "@/../public/images/contract-signing.webp";
import AiEmailAssistantImage from "@/../public/images/ai-email-assistant.webp";
import ChevronDownIcon from "@/../public/icons/chevron-down.svg";
import Link from "next/link";

const Services = [
  {
    img: RecipeBuilder,
    alt: "recipe builder icon",
    title: "Recipe Builder",
    des: "Vendors can create receipts for each arrangement, specifying the flowers required. Once an order is placed, they’ll know exactly what flowers to purchase to assemble the arrangement.",
    hoverImage: RecipeBuilderImage,
  },
  {
    img: ProposalBuilder,
    alt: "proposal builder icon",
    title: "Proposal Builder",
    des: "Vendors can post a customizable proposal builder—a tailored contact form that connects directly with the CRM. This tool adds clients to the system and generates proposals seamlessly.",
    hoverImage: ProposalBuilderImage,
  },
  {
    img: ContractSigning,
    alt: "contract signing icon",
    title: "Contract Signing",
    des: " Vendors’ clients can review and sign contracts directly within the platform, streamlining the agreement process.",
    hoverImage: ContractSigningImage,
  },
  {
    img: AiEmailAssistance,
    alt: "ai email assistance icon",
    title: "Ai Email Assistance",
    des: "An AI-powered email assistant helps florists craft professional and timely email replies, saving time and enhancing customer communication.",
    hoverImage: AiEmailAssistantImage,
  },
];

export default function Wedding() {
  const [imageSrc, setImageSrc] = useState(MacImage);
  const [fade, setFade] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGoingDown, setIsGoingDown] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setFade(false);
  };

  const words = [
    "Wedding Flowers",
    "Elegant Bouquets",
    "Timeless Decor",
    "Floral Arrangements",
    "Romantic Roses",
    "Wedding Bliss",
    "Bridal Blooms",
    "Ceremony Chic",
    "Reception Flowers",
    "Dreamy Aisles",
    "Petal Perfection",
  ];

  const [animationRunning, setAnimationRunning] = useState(true);

  const stopAnimations = () => {
    setAnimationRunning(false);
    setIsVisible(false);
  };

  const startAnimations = () => {
    setAnimationRunning(true);
    setIsVisible(true);
  };

  useEffect(() => {
    if (!animationRunning) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        let nextIndex;
        if (isGoingDown) {
          nextIndex = prevIndex + 1;
          if (nextIndex >= Services.length) {
            nextIndex = prevIndex - 1;
            setIsGoingDown(false);
          }
        } else {
          nextIndex = prevIndex - 1;
          if (nextIndex < 0) {
            nextIndex = prevIndex + 1;
            setIsGoingDown(true);
          }
        }
        return nextIndex;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isGoingDown, animationRunning]);
  const translateYValues = [0, 150, 300, 450];
  const translateY = translateYValues[currentIndex];
  const currentImage = Services[currentIndex].hoverImage;

  return (
    <div className="xl:w-[1200px] w-[90%] m-auto flex flex-col items-center justify-center lg:mt-[40px] mt-[10px] relative">
      {/* <div className="bg-white lg:h-[147px] h-[100px] rounded-[20px] absolute top-[-151px] lg:top-[-305px] w-full flex md:flex-row flex-col justify-around md:gap-0 gap-5 md:p-0 p-5 items-center shadow-[0px_3px_32px_16px_#00000026]">
        <h2 className="font-outfit md:text-start text-center capitalize tracking-[-1.2px] font-normal lg:text-[28px] text-[20px]">
          See how easy it is for brides to create proposals with You
        </h2>
        <Link target="_blank" href={"https://www.wpro.ai/dashboard/events/create?vendorId=1&clientLink=true"}> <button className="xl:w-[276px] lg:flex hidden w-[150px] group md:h-[56px] md:p-0 p-2 rounded-lg bg-primary text-white justify-center items-center hover:bg-white hover:text-primary border-2 border-primary transition-all duration-300 tracking-[-0.6px]">
          Try now
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="md:ms-[24px] ms-4 stroke-white group-hover:stroke-primary transition-all duration-300"
          >
            <path
              d="M7.93335 2L14 7.63333L7.93335 13.2667"
              stroke="current"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="bevel"
            />
            <path
              d="M1 7.4012H13.1333"
              stroke="current"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="bevel"
            />
          </svg>
        </button>
        </Link>

      </div> */}
      {/* <div className="flex flex-col gap-1 lg:gap-7">
        <h2 className="font-medium lg:text-[46px] text-[25px] text-center tracking-[-1.2px]">
          Everyting Your
        </h2>
        <div className="rolling-text-container">
          {words.map((word, index) => (
            <h3
              key={index}
              className={`font-light lg:text-[32px] text-lg text-center tracking-[-1.2px] rolling-text ${index === currentIndex ? "active" : ""
                }`}
            >
              {word}
            </h3>
          ))}
        </div>
        <h2 className="font-medium lg:text-[46px] text-2xl text-center tracking-[-1.2px]">
          business needs to get it done
        </h2>
        <h3 className="font-light lg:text-[24px] text-sm text-center tracking-[-1.2px]">
          Tools for every client interaction
        </h3>
      </div> */}
      {/* <div className="w-full flex lg:flex-row flex-col items-start lg:items-center justify-between lg:mt-[144px] mt-[86px]">
        <div className="lg:w-[50%] w-full lg:flex hidden flex-col items-center lg:items-start">
          <div
            className={`animated-div ${isVisible ? "opacity-100" : "opacity-0"
              }`}
            style={{
              transition: "transform 0.5s ease-in-out",
              transform: `translateY(${translateY}px)`,
            }}
          ></div>
          {Services.map((items, index) => (
            <div
              key={index}
              className={`md:w-[546px] w-full md:h-[150px] h-full hover:rounded-[20px] hover:shadow-[0px_3px_32px_6px_#0000001A] py-[20px] transition-all duration-300 px-[30px] relative group`}
              onMouseEnter={() => {
                setFade(true);
                setTimeout(() => {
                  setImageSrc(items.hoverImage);
                  setIsLoading(true);
                  stopAnimations();
                }, 300);
              }}
              onMouseLeave={() => {
                setFade(true);
                setTimeout(() => {
                  setImageSrc(MacImage);
                  startAnimations();
                  setIsLoading(false);
                }, 300);
              }}
            >
              <div className="absolute top-8">
                <Image src={items.img} height={26} width={26} alt={items.alt} />
              </div>
              <div className="ms-12 flex flex-col gap-2 md:gap-3">
                <h6 className="font-normal md:text-[32px] text-2xl tracking-[-1.2px]">
                  {items.title}
                </h6>
                {isVisible ? (
                  <p
                    className={`font-normal group-hover:opacity-100 transition-all duration-1000 opacity-0 md:text-[15px] text-xs md:leading-5 tracking-[-1.2px]  ${index === currentIndex ? "opacity-100" : "opacity-0"
                      }`}
                  >
                    {items.des}
                  </p>
                ) : (
                  <p
                    className={`font-normal group-hover:opacity-100 transition-all duration-1000 opacity-0 md:text-[15px] text-xs md:leading-5 tracking-[-1.2px]  ${index === currentIndex ? "opacity-0" : "opacity-0"
                      }`}
                  >
                    {items.des}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="lg:hidden block w-full border-gray-200">
          {Services.map((items, index) => (
            <div
              key={index}
              className="w-full border-b-[1px] py-[20px] px-[30px] relative cursor-pointer transition-all ease-in-out duration-300"
              onClick={() => handleToggle(index)}
            >
              <div className="absolute top-8">
                <Image src={items.img} height={26} width={26} alt={items.alt} />
              </div>

              <div
                className={`${expandedIndex === index ? "rotate-180" : ""
                  } absolute right-2 top-7 transition-all duration-300`}
              >
                <Image
                  src={ChevronDownIcon}
                  height={15}
                  width={15}
                  alt="chevron down icon"
                />
              </div>

              <div className="ms-12 flex flex-col gap-2 md:gap-3">
                <h6 className="font-normal md:text-[32px] text-2xl tracking-[-1.2px]">
                  {items.title}
                </h6>
                <p className="font-normal md:text-[15px] text-xs md:leading-5 tracking-[-1.2px]">
                  {items.des}
                </p>
                <div
                  className={`${expandedIndex === index
                    ? "h-auto opacity-100"
                    : "h-0 opacity-0"
                    } overflow-hidden transition-all duration-500 ease-in-out m-auto`}
                  style={{ maxHeight: expandedIndex === index ? "300px" : "0" }}
                >
                  {expandedIndex === index && (
                    <div className="m-auto transition-all duration-300 rounded-[10px]">
                      <Image
                        src={items.hoverImage}
                        alt={items.alt}
                        width={300}
                        height={300}
                        className="transition-all duration-300"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="md:w-[50%] w-full lg:flex hidden md:justify-end justify-center transition-all duration-300">
          <Image
            style={{
              opacity: fade && !isLoading ? 0.6 : 1,
              transform: fade && !isLoading ? "scale(95%)" : "scale(100%)",
              transition:
                "opacity 300ms ease-in-out, transform 300ms ease-in-out",
            }}
            className="drop-shadow-2xl rounded-[20px]"
            onLoad={handleImageLoad}
            src={isVisible ? currentImage : imageSrc}
            height={600}
            width={550}
            alt="image"
          />
        </div>
      </div> */}
      {/* <div className="bg-[#532DC30D] xl:w-[1200px] w-full h-full lg:h-[510px] mt-[120px] md:mt-[60px] rounded-[20px] flex lg:flex-row flex-col md:justify-center justify-start lg:items-center items-start lg:px-[70px] lg:py-[60px] p-6 gap-[90px]">
        <div className="flex flex-col justify-between lg:gap-0 gap-2 lg:w-[50%] w-full h-full">
          <h2 className="font-outfit font-normal lg:text-[48px] text-[38px] mb-5 md:mb-0 lg:leading-[58px] leading-[50px] tracking-[-1.8px]">
            Elevate Your Brand with Luxurious Web Presence.
          </h2>
          <p className="font-outfit font-normal text-[19px] leading-[32px] mb-5 md:mb-0">
            Custom website tailored to reflect the elegance and sophistication
            of your brand.
          </p>
          <div className="flex lg:flex-row flex-col lg:gap-[24px] gap-5 mb-5 md:mb-0">
            <Link href="/wedding-florist-software/contact_us"> <button className="lg:w-[264px] h-[62px] bg-[#5C2AC8] text-white hover:text-primary transition-all duration-300 hover:bg-transparent hover:border border-primary rounded-[10px] font-inter text-center font-medium lg:text-lg text-base">
              Schedule discovery call
            </button>
            </Link>

            <Link
              className="lg:w-[158px] h-[62px] hover:bg-primary hover:text-white text-primary transition-all duration-300 border border-primary rounded-[10px] text-center font-inter font-medium lg:text-lg text-base leading-[62px] lg:leading-[62px]"
              href="/wedding-florist-software/learnmore"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="md:w-[50%] w-full mt-5 mb-0 lg:flex hidden justify-end items-center">
          <Image
            src={WeddingImage}
            alt="wedding image"
            height={341}
            width={490}
          />
        </div>
      </div> */}
      <div className="bg-white lg:h-[147px] h-[100px] mt-[60px] rounded-[20px] bottom-[-73px] xl:w-[1200px] w-full flex md:flex-row flex-col justify-around md:gap-0 gap-5 md:p-0 p-5 items-center shadow-[0px_3px_32px_16px_#00000026]">
        <h2 className="font-outfit md:text-start text-center capitalize tracking-[-1.2px] font-normal lg:text-[28px] text-[20px]">
          See how easy it is for brides to create proposals with You
        </h2>
        <Link target="_blank" href={"https://www.wpro.ai/dashboard/events/create?vendorId=1&clientLink=true"}> <button className="xl:w-[276px] lg:flex hidden w-[150px] group md:h-[56px] md:p-0 p-2 rounded-lg bg-primary text-white justify-center items-center hover:bg-white hover:text-primary border-2 border-primary transition-all duration-300 tracking-[-0.6px]">
          Try now
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="md:ms-[24px] ms-4 stroke-white group-hover:stroke-primary transition-all duration-300"
          >
            <path
              d="M7.93335 2L14 7.63333L7.93335 13.2667"
              stroke="current"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="bevel"
            />
            <path
              d="M1 7.4012H13.1333"
              stroke="current"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="bevel"
            />
          </svg>
        </button>
        </Link>

      </div>
    </div>
  );
}

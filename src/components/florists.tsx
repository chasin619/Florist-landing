import Image from "next/image";
import React from "react";
import WeddingImage from "../../public/images/full-wedding-image.webp";
import WeddingPlanning from "../../public/images/wedding-planning.webp";
import WeddingVenues from "../../public/images/wedding-venues.webp";
import Link from "next/link";

const Services = [
  {
    title: "Custom website design made for your brand",
    dis: "Your floral designs are more than arrangements—they’re works of art that transform weddings into unforgettable experiences. At Wpro, we specialize in crafting custom websites for wedding florists that showcase your unique style and creativity.",
    img: WeddingImage,
    alt: "wedding image",
    layoutReverse: false,
  },
  {
    title: "Websites build on latest technologies and included Op page SEO",
    dis: "Fast loading , SEO friendly, responsive. You can add blogs for increase your SEO. No need to buy extra plugins. Website will be connected to Wpro CRM system - so  all your leads will be in 1 place",
    img: WeddingPlanning,
    alt: "wedding planning and design image",
    layoutReverse: true,
  },
  {
    title: "We constantly will maintain your site.",
    dis: "You dont need to worry about hosting, software updates. All sites let you add your portfolios, reviews and Blogs for SEO. Very simple",
    img: WeddingVenues,
    alt: "romantic wedding venues image",
    layoutReverse: false,
  },
];

const Testimonials = [
  {
    comment:
      "“OMG! I cannot believe that I have got a brand new landing page after getting Omega. It was super easy to edit and publish.”",
    person: "Diego Morata",
  },
  {
    comment:
      "“Simply the best. Better than all the rest. I’d recommend this product to beginners and advanced users.”",
    person: "Franklin Hicks",
  },
];

export default function florists() {
  const MEETING_LINK = "https://calendly.com/chasin619/30min"

  return (
    <div className="xl:w-[1200px] w-[90%] m-auto">
      <div className="flex flex-col w-full mt-[37px] gap-1 lg:gap-[28px]">
        <h2 className="font-normal  lg:text-[36px] text-[26px] text-[#161C2D] text-center tracking-[-1.2px]">
          Websites specially design
        </h2>
        <h3 className="font-normal lg:text-[36px] text-[26px] text-[#161C2D] text-center tracking-[-1.2px]">
          for Wedding florists
        </h3>
      </div>
      {Services.map((items, index) => (
        <div
          key={index}
          className={`flex items-center flex-col gap-8 lg:gap-24 mt-[56px] ${items.layoutReverse ? "lg:flex-row-reverse" : "lg:flex-row"
            } ${items.layoutReverse ? "flex-col" : "flex-col"} ${items.layoutReverse ? "lg:h-[476px]" : "h-full"
            }`}
        >
          <div className="lg:w-2/4 w-full flex flex-col gap-5">
            <h2 className="font-outfit font-normal lg:text-[48px] text-[38px] lg:leading-[58px] leading-[46px] tracking-[-1.8px]">
              {items.title}
            </h2>
            <p className="font-outfit font-normal lg:text-[19px] text-[16px] lg:leading-[32px] leading-[26px] tracking-[-0.2px]">
              {items.dis}
            </p>
            <Link href={MEETING_LINK}>

              <button className="rounded-[10px] hover:bg-white border-2 transition-all duration-300 border-primary hover:text-primary  py-5 w-[227px] lg:w-[277px] bg-[#7A1EDF] text-white">
                Schedule the demo
              </button>
            </Link>

          </div>
          <div
            className={`lg:w-2/4 w-full flex ${items.layoutReverse
              ? "lg:justify-start justify-center"
              : "lg:justify-end justify-center"
              }`}
          >
            <Image
              className=""
              src={items.img}
              width={571}
              height={476}
              alt={items.alt}
            />
          </div>
        </div>
      ))}
      <div className="w-full lg:h-[346px] h-full rounded-[20px] bg-[#532DC30D] mt-[123px] lg:p-14 p-7 flex lg:flex-row flex-col lg:gap-[69px] gap-[40px] mb-[97px]">
        {Testimonials.map((items, index) => (
          <div key={index} className="lg:w-2/4 w-full">
            <h2 className="font-poppins font-semibold text-[104px] leading-[103px] tracking-[-1.44px] text-[#E2994F]">
              “
            </h2>
            <p className="font-outfit font-normal text-[24px] leading-[34px] tracking-[-0.5px] text-[#161C2D]">
              {items.comment}
            </p>
            <p className="font-outfit font-normal text-[17px] leading-[29px] tracking-[-0.2px] mt-[23px]">
              {items.person}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

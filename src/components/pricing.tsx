"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import React, { useState } from "react";



export const customerReviewsData = [
  {
    review: `Build your wedding feature is so amazing, it allowed me to create proposal and instantly see a quote in a few clicks …. 
Super easy to use, and impressed by inquiry form.So up to date with technology. I loved seeing proposal after a few clicks, instead of waiting days for other florists to reply on my emails.`,
    clientName: "Sarah Schmidt",
  },
  {
    review: `Wow… such an easy platform, I was so impressed with design feature, I was able to add my inspirational images and choose everything needed for my wedding.`,
    clientName: "Leila Kalckin",
  },
  {
    review: `When I was searching for a wedding florist, I landed on CHICLU.COM  platform and immediately chose everything I needed for my wedding, I was able to see prices. And after florist sent me a confirmation I was ready to book. My wedding came out as I always dreamed.`,
    clientName: "Julia Simon",
  },
  {
    review: `I booked my wedding Florist only because it was super easy to update things inside the proposal itself, without even emailing for updates.`,
    clientName: "Deborah Sing",
  },
  {
    review: `I love detailed notes and descriptions of everything what I will be getting for my wedding. And I was so impressed when  received proposal from a florist with such a beautiful design board. I am a visual person and proposal helped me so much with visualization of my Wedding Day.`,
    clientName: "Stephanie Reyes",
  },
  {
    review: `Super fast and so beautiful proposal sold itself. Booked florist for my wedding in mAy with proposal builder feature.`,
    clientName: "Anna Kim",
  },
];

export const galleryData = [
  {
    orangeText: "Public",
    title: "Recipes",
    photoPath: "/public-recipes.jpg",
  },
  {
    orangeText: "99",
    title: "Flowers",
    photoPath: "/flowers.jpg",
  },
  {
    orangeText: "60",
    title: "Colors",
    photoPath: "/colors.jfif",
  },
  {
    orangeText: "16",
    title: "Misc Items",
    photoPath: "/misc-items.jpg",
  },
];

export const softwareData = [
  {
    name: "Dynamic Proposal",
    description:
      "Save a lot of time with the dynamic proposal. Just work in the event editor. The software automatically makes all updates to the proposal. No need to fill any fields. Create a beautiful proposal with one click",
    image: "/dynamic-proposal.jfif",
  },
  {
    name: "Web Messenger",
    description:
      "Discuss the wedding details within each event. Add comments to arrangements. Share with messages and pictures one another to come to quite an agreement for each aspect",
    image: "/web-messenger.jfif",
  },
  {
    name: "Notifications",
    description:
      "Receive all brides' changes via updates and notifications in software and your email. Now you won't miss or forget anything",
    image: "/notifications.jfif",
  },
  {
    name: "Instant Event Editor",
    description:
      "The clients often ask for change or add something in the proposal? Edit the recipes right from the event. It allows you to be flexible and handle updates speedily.Provide the best customer service",
    image: "/event-editor.jfif",
  },
];

export const servicesData = [
  {
    title: "Report List",
    description:
      "Create shopping lists for each event and print them out for easy shopping.",
    image: "/report.png",
  },
  {
    title: "Recipes Guide",
    description:
      "Print out recipes from the specific event for your assistants to build arrangements.",
    image: "/recipes.png",
  },
  {
    title: "Data Importing",
    description: "Easily import your gallery from another software.",
    image: "/data-importing.png",
  },
  {
    title: "Payments",
    description: "Get payments for proposals without delay. Powered by Stripe.",
    image: "/payments.png",
  },
  {
    title: "Contract & Letter",
    description:
      "Just copy your existing contract or letter in our platform and use it instantly for all events.",
    image: "/contract.png",
  },
  {
    title: "Docusign",
    description: "Sign the contract via our platform to book proposals.",
    image: "/docusign.png",
  },
];

export const inquiryFormData = [
  {
    name: "Instead of the usual pdf questionnaire now you can send your bride a link or attach it to your website where she can:",
  },
  {
    name: "Create her unique wedding design, using her inspirational pictures",
  },
  {
    name: "Choose stylish arrangements, colors, flowers, inspirations from your gallery",
  },
  {
    name: "Receive a fully customized wedding design.Make changes to the timeline and all the specifics of her perfect day",
  },
];

export const softwareCRMData = [
  {
    name: "The easiest tools for your events",
  },
  {
    name: "Wedding templates builder and editor",
  },
  {
    name: "Automated calculation of your profits for recipes and events",
  },
  {
    name: "Recipe builder to manage design of bouquets",
  },
  {
    name: "Your own gallery of recipes, flowers, colors, misc items",
  },
];

export const pricingPlans = [
  {
    name: "Free",
    description:
      "The easiest way to test if we're a good fit (up to 3 events per year)",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "The easiest way to test if we're a good fit (up to 3 events per year)",
      "All Fetures Included",

    ],
  },
  {
    name: "Pro",
    description: "$99 a month ($999 year save 20%) All features included",
    monthlyPrice: 99,
    yearlyPrice: 999,
    monthlyPriceId: "price_1Qd3nARsj2bye9vmz0qTHxFd",
    yearlyPriceId: "price_1Qd3nSRsj2bye9vmkmxigeMH",
    features: [
      "All Fetures No Limit",

    ],
    mostPopular: true,
  },
  // {
  //   name: "Business",
  //   description: "$250 a month ($2500 a year) All Pro plus custom website",
  //   monthlyPrice: 250,
  //   yearlyPrice: 2500,
  //   monthlyPriceId: "price_1Qd3o2Rsj2bye9vmQ7CG0MeR",
  //   yearlyPriceId: "price_1Qd3oVRsj2bye9vmZ08eGLlB",
  //   features: [
  //     "All Fetures No Limit",
  //     "Costume website ($2500 value)",

  //   ],
  // },
];

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const router = useRouter()
  return (
    <div className="xl:w-[1200px] w-[90%] m-auto flex flex-col items-center justify-center mt-[100px]">
      <h2 className="font-medium text-[36px] lg:text-[46px] text-center">
        Simplify Your <span className="text-primary">Business</span> With Us
      </h2>

      {/* Toggle Button for Monthly/Yearly Pricing */}
      <div className="mt-6 flex space-x-4">
        <button
          className={`px-4 py-2 rounded-md text-lg font-medium transition-all ${selectedPlan === "monthly"
            ? "bg-[#5C2AC8] text-white"
            : "bg-gray-200 text-black"
            }`}
          onClick={() => setSelectedPlan("monthly")}
        >
          Monthly
        </button>
        <button
          className={`px-4 py-2 rounded-md text-lg font-medium transition-all ${selectedPlan === "yearly"
            ? "bg-[#5C2AC8] text-white"
            : "bg-gray-200 text-black"
            }`}
          onClick={() => setSelectedPlan("yearly")}
        >
          Yearly (Save 20%)
        </button>
      </div>

      <div className="mt-10  flex flex-wrap justify-center gap-[30px]">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className="lg:w-[350px]  h-auto   md:h-96 shadow-md w-full border border-primary rounded-xl px-6 py-8 justify-between flex flex-col relative"
          >
            {/* Most Popular Badge */}
            {plan.mostPopular && (
              <p className="absolute w-[120px] font-bold text-[12px] bg-[#5C2AC8] text-white uppercase leading-[25px] text-center top-[15px] right-[15px]">
                Most Popular
              </p>
            )}

            {/* Plan Name */}
            <h3 className="text-[22px] font-bold text-[#5C2AC8] uppercase text-center">
              {plan.name}
            </h3>

            {/* Plan Description */}
            <p className="text-gray-700 text-[16px] mt-2 text-center">
              {`Billed ${selectedPlan === "yearly" ? "Yearly" : "Monthly"}`}

            </p>

            {/* Pricing */}
            <p className="text-[28px] font-bold text-center mt-4">
              ${selectedPlan === "yearly" ? plan.yearlyPrice : plan.monthlyPrice}
              <span className="text-gray-500 text-[16px]">/{selectedPlan}</span>
            </p>

            {/* Features List */}
            {/* <p className="text-md font-semibold mt-5">Key Features:</p> */}
            <ul className="list-disc pl-5 text-gray-600 text-[14px] space-y-2 mt-2">
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>

            {/* Choose Plan Button */}
            <button
              onClick={() => router.push(`/register?planName=${plan.name}`)}
              className="w-full text-center text-[18px] font-medium mt-6 py-3 rounded-md bg-[#5C2AC8] text-white hover:bg-[#4a1ea6] transition-all duration-300"
            >
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

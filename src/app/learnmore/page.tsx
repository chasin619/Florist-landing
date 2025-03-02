import Hero from '../../components/heroSecondary';
import Florists from "../../components/florists";
import PreFooter from "../../components/preFooterSecondary";
import Footer from "../../components/footer";
import React from "react";
import NavbarSecondary from "../../components/navbarSecondary";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Custom Websites for Wedding Florists – Designed to Grow Your Business",
  description:
    "Get a stunning, SEO-optimized custom website for your wedding florist business. Showcase your portfolio, manage bookings, and attract more clients effortlessly!",
};

export default function page() {
  return (
    <div>
      <NavbarSecondary />
      <Hero />
      <Florists />
      <PreFooter />
      <Footer />
    </div>
  );
}

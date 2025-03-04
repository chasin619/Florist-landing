import React from "react";
import Footer from "../../../components/footer";
import Contact from "../../../components/contact";
import { Metadata } from "next";
import NavbarSecondary from "../../../components/navbarSecondary";
//  created a branch
export const metadata: Metadata = {
  title: "WPro.AI – Contact us",
  description:
    "Streamline your wedding florist business with WPro.AI. Manage proposals, contracts, inventory, and client communication with ease. Try it today!",
};

export default function page() {
  return (
    <div>
      {/* <Navbar /> */}
      <NavbarSecondary />
      <Contact />
      <Footer />
    </div>
  );
}

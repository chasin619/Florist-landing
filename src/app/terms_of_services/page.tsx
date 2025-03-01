import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Terms from "@/components/terms";
import { Metadata } from "next";
import NavbarSecondary from "@/components/navbarSecondary";


export const metadata: Metadata = {
  title: "WPro.AI – Term of Services",
  description:
    "Streamline your wedding florist business with WPro.AI. Manage proposals, contracts, inventory, and client communication with ease. Try it today!",
};

export default function page() {
  return (
    <div>
      <NavbarSecondary />
      <Terms />
      <Footer />
    </div>
  );
}

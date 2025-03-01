"use client";

import flowers from "../../public/landing/flowers.png";
import arrangements from "../../public/landing/arrangements4.png";
import weddingNumbers from "../../public/landing/weddingnumbers.png";
import clientportal from "../../public/landing/clientportal.png";
import dashboard from "../../public/landing/dashboard.png";
import dashboard2 from "../../public/landing/flowercat.png";
import dashboard3 from "../../public/landing/deliverycat.png";
import clientportal2 from "../../public/landing/clientportal.png";
import clientportal3 from "../../public/landing/clientportal3.png";
import clientportal4 from "../../public/landing/clientportal4.png";
import clientportal5 from "../../public/landing/clientportal5.png";
import detail from "../../public/landing/details.png";
import detail2 from "../../public/landing/timelocation.png";
import flowers2 from "../../public/landing/flowers.png";
import flowers3 from "../../public/landing/flowers3.png";
import flowers4 from "../../public/landing/flowers4.png";
import flowers5 from "../../public/landing/flowers5.png";
import eventform1 from "../../public/eventform1.png";
import eventform2 from "../../public/eventform2.png";
import eventdesign from "../../public/eventdesign.png";
import eventdesign2 from "../../public/design2.png";
import eventlist from "../../public/eventlist.png";
import Preview from "../../public/previewevent.png";
import SlideItem from "./slideItem";
import arrangement2 from "../../public/landing/addarr.png";
import arrangement3 from "../../public/landing/listarr.png";
import arrangement4 from "../../public/landing/arrangements4.png";
import arrangement5 from "../../public/landing/typearr.png";
import eventdetail from "../../public/landing/eventdetail.jpeg";

import {
  Dashboard,
  Event,
  LibraryBooks,
  People,
  Work,
  Palette,
  Category,
  Timer,
  Preview as PreviewIcon,
  DesignServices,
  ListAlt,
} from "@mui/icons-material";

const MEETING_LINK = "https://calendly.com/chasin619/30min";

export const resourcesData = [
  {
    image: arrangement3.src,
    title: "Arrangements List",
    titleFull: "Arrangements List",
    icon: LibraryBooks,
    shortDescription: "All arrangements you can use.",
    description: "List of all arrangements you have in the database.",
  },
  {
    image: arrangement2.src,
    icon: LibraryBooks,

    title: "Add Arrangement",
    titleFull: "Add Arrangement with Ingredients",
    shortDescription: "All arrangements you can use.",
    description:
      "You can manage what ingredients you need for each arrangement and use it later for reports.",
  },
  {
    image: arrangement5.src,
    icon: LibraryBooks,

    title: "Arrangement Type",
    titleFull: "Arrangement Type",
    shortDescription: "Arrangement types you use.",
    description:
      "Create arrangement types in the dashboard. We preload about 20 types there to start.",
  },
  {
    image: flowers5.src,
    title: "Flowers Category",
    titleFull: "Flowers Category",
    icon: Category,
    shortDescription: "Add new Flowers category in your database.",
    description: "Here will be a list of Flowers categories you can work with.",
  },
  {
    image: flowers4.src,
    title: "Colors",
    titleFull: "Add New Colors in Your Database",
    shortDescription: "List of available colors for you.",
    icon: Category,

    description:
      "Here will be a list of colors you and your client can work with. We have preloaded hundreds of colors already.",
  },
  {
    image: flowers.src,
    title: "Flowers",
    titleFull: "Flowers Category",
    icon: Category,

    shortDescription: "Add new Flowers in your database.",
    description:
      "Here will be a list of Flowers you can choose. We have preloaded hundreds of flowers already.",
  },
  {
    image: arrangement4.src,
    title: "Labor Cost",
    titleFull: "Labor Cost",
    description: "Set Labor cost in Dashboard.",
    icon: Category,

    shortDescription:
      "Set your Labor cost in Dashboard. It will be used in minutes when calculating.",
  },
  {
    image: arrangement2.src,
    title: "Labor Time",
    titleFull: "Labor Time",
    icon: Category,

    shortDescription: "Set Labor time.",
    description: "Labor time needed to create an arrangement.",
  },
];

export const eventsData = [
  {
    image: eventdetail.src,
    title: "Event Details",
    titleFull: "Event Details",
    description:
      "Manage comprehensive event details, including schedules, themes, and guest preferences to ensure a seamless event experience.",
    shortDescription: "Handle event details and planning.",
  },
  {
    image: eventform2.src,
    title: "Wedding Numbers",
    description:
      "Keep track of guest lists, seating arrangements, and RSVP statuses to ensure precise event planning and execution.",
    shortDescription: "Manage guest lists and seating.",
  },
  {
    image: eventdesign.src,
    title: "Event Design ",
    description:
      "Create stunning event layouts and themes using customizable templates for floral arrangements, decorations, and overall aesthetics.",
    shortDescription: "Design event layouts and themes.",
  },
  {
    image: eventdesign2.src,
    title: "Event Design Preview ",
    description:
      "Get a visual preview of event designs before finalizing, ensuring all elements align with client expectations.",
    shortDescription: "Preview event designs before finalization.",
  },
  {
    image: Preview.src,
    title: "Event Page Preview ",
    description:
      "View a live preview of event pages to ensure all details, designs, and layouts are perfectly organized.",
    shortDescription: "Check event pages before launch.",
  },
  {
    image: eventlist.src,
    title: "Events List ",
    description:
      "Access a well-organized list of all events, including their statuses, schedules, and important updates for seamless management.",
    shortDescription: "View and track all events.",
  },
  {
    image: eventlist.src,
    title: "Events List Grid",
    description:
      "Access a well-organized list of all events, including their statuses, schedules, and important updates for seamless management.",
    shortDescription: "View and track all events.",
  },
  {
    image: eventlist.src,
    title: "Events List 4",
    description:
      "Access a well-organized list of all events, including their statuses, schedules, and important updates for seamless management.",
    shortDescription: "View and track all events.",
  },
];

export const dashboardData = [
  {
    image: dashboard.src,
    title: "Profile",
    titleFull: "Profile page",
    description:
      "The Profile section in the dashboard allows users to view their personal and business details efficiently.",
    shortDescription: "Manage user profiles and details.",
  },
  {
    image: dashboard2.src,
    title: "Flower Category",
    description:
      "Create a new flower category. Read and display existing categories. Update a category name or details. Delete an existing category.",
    shortDescription: "Organize and manage flower categories.",
  },
  {
    image: dashboard3.src,
    title: "Delivery Pricing",
    description:
      "Create new delivery price entries. Read and display existing delivery prices. Update pricing details. Delete a delivery pricing entry.",
    shortDescription: "Manage and set delivery pricing.",
  },
];

export const clientPortalData = [
  {
    image: clientportal.src,
    title: "Client Portal",
    titleFull: "Client Portal full",
    description:
      "A centralized platform where clients can track orders, monitor progress, request updates, and manage bookings efficiently.",
    shortDescription: "Track orders and manage bookings.",
  },
  {
    image: clientportal3.src,
    title: "Design",
    description:
      "Clients can access an intuitive and user-friendly interface designed for seamless navigation and an enhanced booking experience.",
    shortDescription: "Navigate and access design tools.",
  },
  {
    image: clientportal4.src,
    title: "Preview",
    description:
      "Clients can preview order details, including arrangements, pricing, and contracts before confirmation, ensuring everything meets their expectations.",
    shortDescription: "Preview and confirm order details.",
  },
  {
    image: clientportal5.src,
    title: "Sign Contract",
    description:
      "The Client Portal enables digital contract signing, allowing clients to review, sign, and manage agreements seamlessly within the platform.",
    shortDescription: "Digitally sign and manage contracts.",
  },
  {
    image: clientportal.src,
    title: "Client Portal 1",
    description:
      "A centralized platform where clients can track orders, monitor progress, request updates, and manage bookings efficiently.",
    shortDescription: "Track orders and manage bookings.",
  },
  {
    image: clientportal3.src,
    title: "Design 1",
    description:
      "Clients can access an intuitive and user-friendly interface designed for seamless navigation and an enhanced booking experience.",
    shortDescription: "Navigate and access design tools.",
  },
  {
    image: clientportal4.src,
    title: "Preview 1",
    description:
      "Clients can preview order details, including arrangements, pricing, and contracts before confirmation, ensuring everything meets their expectations.",
    shortDescription: "Preview and confirm order details.",
  },
  {
    image: clientportal5.src,
    title: "Sign Contract 1",
    description:
      "The Client Portal enables digital contract signing, allowing clients to review, sign, and manage agreements seamlessly within the platform.",
    shortDescription: "Digitally sign and manage contracts.",
  },
];

export const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    description:
      "The dashboard includes user profiles, flower categories, and delivery pricing management.",
    shortDescription: "Manage profiles, categories, and pricing.",
  },
  {
    id: "Resources",
    label: "Resources",
    description:
      "Essential resources for florists, including arrangement and flower management tools.",
    shortDescription: "Manage arrangements and flowers.",
  },
  {
    id: "events",
    label: "Create Events",
    description:
      "Manage event resources, including arrangements, event designs, and wedding details.",
    shortDescription: "Plan, design, and track events.",
  },
  {
    id: "clientportal",
    label: "Client Portal",
    description:
      "Clients can track orders, request updates, sign contracts, and preview event details.",
    shortDescription: "Monitor orders and manage bookings.",
  },
];

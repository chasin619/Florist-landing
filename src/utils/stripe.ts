import Stripe from "stripe";
import apiInstance from "./api";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const STRIPE_SECRET_KEY = process.env.STRIPE_API_KEY;
export const stripe = new Stripe(STRIPE_SECRET_KEY as string);

export const redirectToCheckout = async (userData: any) => {
  const token = Cookies.get("authToken");

  if (!token) {
    const response = await apiInstance.post("/user/check-existence", {
      business_email: userData.business_email,
      phone: userData.phone,
    });
    if (response.data.exists) {
      return toast.error("User already exists");
    }
  }

  const { url }: any = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: userData.subscriptionPlan.id,
        quantity: 1,
      },
    ],
    allow_promotion_codes: true,
    metadata: {
      userData: JSON.stringify(userData),
    },
    mode: "subscription",
    success_url: "https://wpro.ai/?login=true",
    cancel_url: "https://wpro.ai/register",
  });
  window.location.href = url;
};

"use client";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://florist-wpro-backend.vercel.app/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          message: "",
        });

        toast.success("Message sent successfully!");
      } else {
        toast.error("Error sending message. Please try again later.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("Error: " + error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="xl:w-[1200px] w-[90%] contact-us m-auto mt-32 mb-5 flex justify-center items-center">
      <div className="xl:w-[80%] w-full rounded-3xl shadow-[0px_3px_32px_16px_#00000026] lg:p-10 p-5">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-5"
        >
          <div className="flex lg:flex-row flex-col gap-4 w-full">
            <input
              className="bg-gray-100 rounded-full px-5 w-full h-14 outline-primary text-primary text-lg"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your Name"
            />
            <input
              className="bg-gray-100 rounded-full px-5 w-full h-14 outline-primary text-primary text-lg"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Your Email"
            />
          </div>
          <div className="w-full">
            <textarea
              className="bg-gray-100 resize-none rounded-3xl p-5 w-full h-[155px] outline-primary text-primary text-lg"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Your Message"
            ></textarea>
          </div>
          <input
            className="py-3 w-36 rounded-full text-center bg-primary outline-primary text-white cursor-pointer hover:bg-white hover:text-primary border-2 transition-all duration-300 border-primary"
            type="submit"
            value="Contact Us"
          />
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

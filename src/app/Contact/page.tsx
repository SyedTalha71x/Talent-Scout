"use client";
import React, { useEffect } from "react";
import Banner from "../Components/Partials/Banner/banner";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

const Page = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <>
      <div
        className="relative bg-cover bg-center"
        style={{ backgroundImage: "url('/bg-jobpost.jpg')" }}
      >
        <div className="absolute inset-0 bg-slate-600 opacity-75"></div>
        <div className="relative flex justify-center items-center text-center flex-col lg:p-36 md:p-26 sm:p-20 p-16">
          <h1 className="text-white lg:text-5xl md:text-4xl sm:text-2xl w-full text-2xl font-bold">
            Contact Us
          </h1>
          <p className="text-gray-300 mt-1 text-lg w-full">
            Get connect with us today and kickstart your career!
          </p>
        </div>
      </div>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, x: -150 },
          visible: { opacity: 1, x: -0, transition: { duration: 0.9 } },
        }}
        className="bg-green-50 mt-10 lg:h-screen lg:w-[90%] mx-auto md:w-[90%] sm:w-full w-full"
      >
        <div className="grid lg:grid-cols-3 items-center max-lg:justify-center gap-6 h-full sm:p-12 p-8 max-sm:p-4">
          <div className="max-w-lg max-lg:mx-auto max-lg:text-center max-lg:mb-6">
            <h2 className="text-4xl font-extrabold text-gray-800">
              Get In Touch
            </h2>
            <p className="text-sm text-gray-600 mt-4 leading-relaxed">
              Have a specific inquiry or looking to explore new opportunities?
              Our experienced team is ready to engage with you.
            </p>

            <form className="mx-auto mt-8 bg-white rounded-lg p-6 shadow-md space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full rounded-md h-12 px-6 bg-[#f0f1f2] text-sm outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-md h-12 px-6 bg-[#f0f1f2] text-sm outline-none"
              />
              <input
                type="text"
                placeholder="Subject"
                className="w-full rounded-md h-12 px-6 bg-[#f0f1f2] text-sm outline-none"
              />
              <textarea
                placeholder="Message"
                rows={6}
                className="w-full rounded-md px-6 bg-[#f0f1f2] text-sm pt-3 outline-none"
              ></textarea>
              <button
                type="button"
                className="bg-purple-600 nav-btns text-white font-semibold rounded-md text-sm px-6 py-3 block w-full"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="z-10 relative lg:col-span-2">
            <Image
            height={1000}
            width={1000}
              src="https://readymadeui.com/images/analtsis.webp"
              alt="Analysis"
              className="w-3/4 object-contain block mx-auto"
            />
          </div>
        </div>
      </motion.div>
      <Banner />
    </>
  );
};

export default Page;

"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const HiringBanner: React.FC = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Animation for the entire component
  const bannerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
  };

  // Text animations for letter-based animation
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, staggerChildren: 0.1 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  // Function to split text into individual letters for animation
  const splitText = (text: string) => {
    return text.split("").map((letter, index) => (
      <motion.span key={index} variants={letterVariants}>
        {letter}
      </motion.span>
    ));
  };

  return (
    <motion.div
      ref={ref}
      variants={bannerVariants}
      initial="hidden"
      animate={controls}
      className="lg:w-[85%] md:w-[90%] sm:w-full w-full mx-auto lg:mt-[10%] md:mt-[10%] sm:mt-[10%] mt-[15%] px-5 lg:flex lg:justify-between lg:items-center lg:flex-row md:flex md:justify-center md:items-center md:flex-col sm:flex sm:justify-center sm:items-center sm:flex-col flex justify-center items-center flex-col"
    >
      <div className="relative">
        <img
          src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/homepage1/img1.png"
          alt="Team"
          className="rounded-[40px] object-cover"
        />
      </div>

      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <motion.h3
          variants={textVariants}
          initial="hidden"
          animate={controls}
          className="text-gray-400 lg:text-3xl md:text-3xl sm:text-2xl text-2xl lg:mt-0 md:mt-10 sm:mt-10 mt-10 font-bold"
        >
          Millions Of Jobs.
        </motion.h3>

        <motion.h1
          className="lg:text-6xl md:text-6xl sm:text-5xl text-4xl font-extrabold text-gray-800 mt-2 mb-4"
          variants={textVariants}
          initial="hidden"
          animate={controls}
        >
          {splitText("Find The One That’s ")}
          <span className="text-blue-600">
            {splitText("Right")}
          </span>
          {splitText(" For You")}
        </motion.h1>

        <motion.p
          variants={textVariants}
          initial="hidden"
          animate={controls}
          className="text-gray-500 mb-6"
        >
          Search all the open positions on the web. Get your own personalized
          salary estimate. Read reviews on over 600,000 companies worldwide. The
          right job is out there.
        </motion.p>

        <motion.div
          className="flex justify-center lg:justify-start items-center space-x-4"
          variants={textVariants}
          initial="hidden"
          animate={controls}
        >
          <Link href={"/JobForum"}>
            <button className="bg-blue-600 lg:text-sm md:text-sm sm:text-sm text-xs hover:bg-blue-700 nav-btns text-white px-6 py-3 rounded-md">
              Search Jobs
            </button>
          </Link>
          <button className="text-blue-600 lg:text-sm md:text-sm sm:text-sm text-xs border nav-btns border-blue-600 px-6 py-3 rounded-md hover:bg-blue-600 hover:text-white">
            Learn More
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HiringBanner;

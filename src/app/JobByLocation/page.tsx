"use client"
import { useAnimation , motion} from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
const JobLocations = () => {
    const controls = useAnimation();
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  
    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);
  
    const bannerVariants = {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
    };

    const locations = [
      {
        id: 1,
        city: "Paris, France",
        vacancies: 5,
        companies: 120,
        imageUrl:
          "https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/homepage1/location1.png",
        badge: "Hot",
      },
      {
        id: 2,
        city: "London, England",
        vacancies: 7,
        companies: 68,
        imageUrl:
          "https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/homepage1/location2.png",
        badge: "Trending",
      },
      {
        id: 3,
        city: "New York, USA",
        vacancies: 9,
        companies: 80,
        imageUrl:
          "https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/homepage1/location3.png",
        badge: "Hot",
      },
      {
        id: 4,
        city: "Amstardam Holland",
        vacancies: 10,
        companies: 70,
        imageUrl:
          "https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/homepage1/location4.png",
        badge: "Hot",
      },
      {
        id: 5,
        city: "Copenhangan Denmark",
        vacancies: 7,
        companies: 80,
        imageUrl:
          "https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/homepage1/location5.png",
        badge: "Trending",
      },
      {
        id: 6,
        city: "Berlin Germnay",
        vacancies: 7,
        companies: 50,
        imageUrl:
          "https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/homepage1/location6.png",
        badge: "Hot",
      },
    ];
  
    return (
      <motion.div
      ref={ref}
      variants={bannerVariants}
      initial="hidden"
      animate={controls}
      className="px-4 lg:w-[85%] md:w-[90%] sm:w-full w-full mx-auto lg:mt-[10%] md:mt-[10%] sm:mt-[10%] mt-[15%]">
        <h1 className="sm:text-3xl text-2xl font-extrabold title-font text-center text-gray-800 mb-2">
          Jobs by Location
        </h1>
        <p className="text-base leading-relaxed xl:w-full lg:w-full text-center mx-auto w-full text-gray-500">
          Find your favourite jobs and get the benefits of yourself
        </p>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {locations.map((location) => (
            <div
              key={location.id}
              className="relative rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-60 w-full">
                <img
                  src={location.imageUrl}
                  alt={location.city}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
                <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                  {location.badge}
                </span>
              </div>
  
              <div className="p-4 mt-2">
                <h2 className="text-xl font-bold">{location.city}</h2>
                <p className="text-sm text-gray-500">
                  {location.vacancies} Vacancy
                </p>
                <p className="text-sm text-gray-500">
                  {location.companies} companies
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  };
  
  export default JobLocations;
  
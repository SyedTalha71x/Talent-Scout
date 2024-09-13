"use client";
import { useAnimation, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const JobLocations = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const [locations, setLocations] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        // Assuming API endpoint is `/api/Jobs/locations`
        const response = await fetch('/api/Jobs/getJob');
        if (!response.ok) {
          throw new Error('Failed to fetch job locations');
        }
        const data = await response.json();
        const uniqueLocations = Array.from(new Set(data.jobs.map((job: any) => job.location)))
                                    .map(location => ({ city: location }));
        setLocations(uniqueLocations);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching locations');
      }
    };

    fetchLocations();
  }, []);

  const bannerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
  };

  // Hardcoded image URLs
  const imageUrls: Record<string, string> = {
    "Paris, France": "https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/homepage1/location1.png",
    "London, England": "https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/homepage1/location2.png",
    "New York, USA": "https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/homepage1/location3.png",
    "Amstardam, Holland": "https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/homepage1/location4.png",
    "Copenhangan, Denmark": "https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/homepage1/location5.png",
    "Berlin, Germany": "https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/homepage1/location6.png",
  };

  return (
    <motion.div
      ref={ref}
      variants={bannerVariants}
      initial="hidden"
      animate={controls}
      className="px-4 lg:w-[85%] md:w-[90%] sm:w-full w-full mx-auto lg:mt-[10%] md:mt-[10%] sm:mt-[10%] mt-[15%]"
    >
      <h1 className="sm:text-3xl text-2xl font-extrabold title-font text-center text-gray-800 mb-2">
        Jobs by Location
      </h1>
      <p className="text-base leading-relaxed xl:w-full lg:w-full text-center mx-auto w-full text-gray-500">
        Find your favorite jobs and get the benefits yourself
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {error && <p className="text-center text-red-500">{error}</p>}
        {locations.length === 0 ? (
          <p className="text-center text-gray-500">No locations available</p>
        ) : (
          locations.map((location) => (
            <Link href={`/SingleLocationJob/${location.city}`}>
            <div
              key={location.city}
              className="relative rounded-lg shadow-lg overflow-hidden nav-btns cursor-pointer hover:shadow-xl transition-shadow"
              >
              <div className="relative h-60 w-full">
                <img
                  src={imageUrls[location.city] || "https://via.placeholder.com/600x400"}
                  alt={location.city}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
                <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                  {["Hot", "Trending"][Math.floor(Math.random() * 2)]}
                </span>
              </div>

              <div className="p-6 mt-2">
                <h2 className="text-xl font-bold">{location.city}</h2>
                {/* <p className="text-sm text-gray-500">Vacancies: Data not available</p>
                <p className="text-sm text-gray-500">Companies: Data not available</p> */}
              </div>
            </div>
        </Link>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default JobLocations;

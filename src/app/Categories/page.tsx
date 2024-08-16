"use client";
import React from 'react';
import { FaDollarSign, FaUser, FaLaptopCode, FaChartLine, FaBriefcase, FaPenNib, FaSearch, FaShieldAlt, FaShoppingCart } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';


const cards = [
    {
        id: 1,
        title: "Finance",
        jobsAvailable: 186,
        icon: <FaDollarSign />
    },
    {
        id: 2,
        title: "Customer",
        jobsAvailable: 120,
        icon: <FaUser />
    },
    {
        id: 3,
        title: "Software",
        jobsAvailable: 98,
        icon: <FaLaptopCode />
    },
    {
        id: 4,
        title: "Marketing & Sales",
        jobsAvailable: 142,
        icon: <FaChartLine />
    },
    {
        id: 5,
        title: "Management",
        jobsAvailable: 77,
        icon: <FaBriefcase />
    },
    {
        id: 6,
        title: "Content Writer",
        jobsAvailable: 54,
        icon: <FaPenNib />
    },
    {
        id: 7,
        title: "Market Research",
        jobsAvailable: 63,
        icon: <FaSearch />
    },
    {
        id: 8,
        title: "Security Analyst",
        jobsAvailable: 45,
        icon: <FaShieldAlt />
    },
    {
        id: 9,
        title: "Retail & Products",
        jobsAvailable: 112,
        icon: <FaShoppingCart />
    }
];

const Page = () => {
    const controls = useAnimation();
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);
    return (
        <section className="text-gray-600 body-font">
            <motion.div
                ref={ref}
                initial="hidden"
                animate={controls}
                variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                }}
                className="container px-5 py-24 mx-auto">
                <div className="text-center mb-14">
                    <h1 className="sm:text-3xl text-2xl font-extrabold title-font text-gray-800 mb-4">Browse by Categories</h1>
                    <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500">Find the job that’s perfect for you. About 800+ new jobs every day.</p>
                    <div className="flex mt-6 justify-center">
                        <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
                    </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 lg:w-[80%] md:w-full sm:w-full w-full mx-auto">
                    {cards.map(card => (
                        <div key={card.id} className="p-4 cards-animate cursor-pointer rounded-xl border-2 border-slate-200 hover:border-2 hover:border-blue-300 flex justify-center items-center space-x-4">
                            <div className="flex-shrink-0 text-2xl text-purple-600">
                                {card.icon}
                            </div>
                            <div className="flex-grow">
                                <h2 className="text-gray-900 text-md title-font font-bold">{card.title}</h2>
                                <p className="leading-relaxed text-sm">{card.jobsAvailable} jobs available</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}

export default Page;

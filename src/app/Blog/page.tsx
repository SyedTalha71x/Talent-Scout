"use client";
import React from 'react'
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';

const Page = () => {
    const controls = useAnimation();
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);
    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
            }}

            className=" mt-36">
            <div className="lg:w-[1280px] md:w-[90%] sm:w-[90%] w-[90%] mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-800 ">OUR LATEST BLOGS</h2>
                    <p className='text-gray-600 text-md leading-relaxed'>Get the latest news, updates and tips</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-md:max-w-lg mx-auto">
                    <div className="bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative top-0 hover:-top-2 transition-all duration-300">
                        <Image height={1000} width={1000} src="https://readymadeui.com/Imagination.webp" alt="Blog Post 1" className="w-full h-60 object-cover" />
                        <div className="p-6">
                            <span className="text-sm block text-gray-400 mb-2">10 FEB 2023 | BY JOHN DOE</span>
                            <h3 className="text-xl font-bold text-[#333]">A Guide to Igniting Your Imagination</h3>
                            <hr className="my-6" />
                            <p className="text-gray-400 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula.</p>
                        </div>
                    </div>
                    <div className="bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative top-0 hover:-top-2 transition-all duration-300">
                        <Image height={1000} width={1000} src="https://readymadeui.com/hacks-watch.webp" alt="Blog Post 2" className="w-full h-60 object-cover" />
                        <div className="p-6">
                            <span className="text-sm block text-gray-400 mb-2">7 JUN 2023 | BY MARK ADAIR</span>
                            <h3 className="text-xl font-bold text-[#333]">Hacks to Supercharge Your Day</h3>
                            <hr className="my-6" />
                            <p className="text-gray-400 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula.</p>
                        </div>
                    </div>
                    <div className="bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative top-0 hover:-top-2 transition-all duration-300">
                        <Image height={1000} width={1000} src="https://readymadeui.com/prediction.webp" alt="Blog Post 3" className="w-full h-60 object-cover" />
                        <div className="p-6">
                            <span className="text-sm block text-gray-400 mb-2">5 OCT 2023 | BY SIMON KONECKI</span>
                            <h3 className="text-xl font-bold text-[#333]">Trends and Predictions</h3>
                            <hr className="my-6" />
                            <p className="text-gray-400 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula.</p>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center items-center mt-7'>
                    <Link href={"/Blogs"}>
                        <button className='bg-purple-600 text-white py-2 px-6 text-lg rounded-md nav-btns'>More Blogs</button>
                    </Link>
                </div>
            </div>

        </motion.div>
    )
}

export default Page
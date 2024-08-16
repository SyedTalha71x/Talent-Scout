"use client";
import React, { useEffect } from 'react';
import { MdEmail } from 'react-icons/md';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';


const Banner = () => {
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


            className='mt-20'>
            <div
                className="min-h-[350px] mt-10 relative lg:w-[1280px] md:w-[90%] sm:w-[95%] w-[95%] mx-auto rounded-lg overflow-hidden"
                style={{
                    backgroundImage: "url('https://images.pexels.com/photos/34140/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay */}
                <div className='flex flex-col justify-center items-center mt-9 relative lg:p-10 md:p-8 sm:p-6 p-5 rounded-lg'>
                    <div>
                        <h1 className='lg:w-[70%] md:w-full sm:w-full w-full mx-auto text-4xl font-bold text-center text-white'>
                            New Things Will Always Update Regularly
                        </h1>
                    </div>
                    <div className="mt-8 lg:w-[40%] md:w-[60%] sm:w-[80%] w-full mx-auto">
                        <div className="flex items-center p-2 bg-white rounded-lg overflow-hidden">
                            <span className="p-2">
                                <MdEmail className="text-gray-500 text-3xl rounded-md" />
                            </span>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-grow p-2 outline-none"
                            />
                            <button className="p-2 text-sm nav-btns bg-[#0d6efd] text-white font-bold rounded-md ml-2">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default Banner;

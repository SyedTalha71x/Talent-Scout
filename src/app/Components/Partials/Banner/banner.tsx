"use client";
import React, { useEffect } from 'react';
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
            className='mt-20'
        >
            <div
                className="min-h-[350px] mt-10 relative lg:w-[1280px] md:w-[90%] sm:w-[95%] w-[95%] mx-auto rounded-lg -z-50"
                style={{
                    backgroundImage: "url('https://images.pexels.com/photos/34140/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Darker overlay for better contrast */}
                <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

                {/* Add z-20 to the content to make it clickable */}
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 text-white text-center relative z-20">
                    <div className="mx-auto max-w-screen-md sm:text-center">
                        {/* Text shadow added for better readability */}
                        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                            Sign up for our newsletter
                        </h2>
                        <p className="mx-auto mb-8 max-w-2xl text-white md:mb-12 sm:text-lg dark:text-gray-400">
                            Stay up to date with the roadmap progress, announcements, and exclusive discounts. Feel free to sign up with your email.
                        </p>
                        <form action="#">
                            <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                                <div className="relative w-full">
                                    <label htmlFor="email" className="hidden mb-2 text-sm font-medium text-white">Email address</label>
                                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                        </svg>
                                    </div>
                                    <input className="block p-3 pl-9 w-full text-sm text-gray-800 bg-white rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter your email" type="email" id="email" required />
                                </div>
                                <div>
                                    <button type="submit" className="py-3 px-5 w-full text-sm font-medium text-center bg-purple-600 text-white rounded-lg cursor-pointer sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                            <div className="mx-auto max-w-screen-sm text-sm text-center text-gray-200 newsletter-form-footer dark:text-gray-300">
                                We care about the protection of your data. <a href="#" className="font-medium text-primary-600 dark:text-primary-500 hover:underline">Read our Privacy Policy</a>.
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default Banner;

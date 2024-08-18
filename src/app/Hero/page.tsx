"use client";
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';

const Banner = () => {
    const controls = useAnimation();
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    return (
        <div className='bg-header'>
            <div className="mx-auto max-w-7xl pt-20 sm:pb-24 px-6">
                <div className='grid grid-cols-1 lg:grid-cols-12'>
                    <motion.div
                        ref={ref}
                        initial="hidden"
                        animate={controls}
                        variants={{
                            hidden: { opacity: 0, y: 50 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                        }}
                        className='col-span-7 flex flex-col justify-evenly relative'
                    >
                        <Image src="/assets/banner/star.svg" alt="star-image" width={95} height={97} className='absolute top-[-74px] right-[51px] animate-slow-bounce ' />
                        <Image src="/assets/banner/lineone.svg" alt="line-image" width={190} height={148} className='absolute top-[-74px] right-[51px]' />
                        <h1 className='text-blue-950 text-4xl md:text-[90px] text-center lg:text-start font-semibold lh-133 pt-5'>Welcome to Talent Scout</h1>
                        <h3 className='text-gray-700 opacity-75 text-lg font-normal text-center lg:text-start pt-2'>Elevate your career with personalized job recommendations and seamless application processes, Browse diverse job opportunities, tailor your search, and land your perfect role with ease</h3>
                        <div className=' mx-auto lg:mx-0 pt-2'>
                            <Link href={"/JobForum"}>

                                <button className="text-white text-md py-3 px-12 rounded-lg transition duration-150 ease-in-out bg-purple-600 nav-btns">
                                    Explore Now
                                </button>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        ref={ref}
                        initial="hidden"
                        animate={controls}
                        variants={{
                            hidden: { opacity: 0, y: 50 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } }
                        }}
                        className='col-span-5 flex justify-center xl:-mb-32 xl:-mr-32 pt-10 lg:pt-0'
                    >
                        <Image src="/assets/banner/banner.png" alt="nothing" width={1000} height={805} />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default Banner;

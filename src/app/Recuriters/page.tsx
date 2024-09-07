"use client";
import React, { useState } from 'react';
import { CiLocationOn } from "react-icons/ci";
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

// Array of recruiter data
const recruiters = [
    {
        image: '/images/google.webp',
        name: 'Google',
        location: 'Mountain View, CA',
        activation: 100
    },
    {
        image: '/images/microsoft.png',
        name: 'Microsoft',
        location: 'Redmond, WA',
        activation: 80
    },
    {
        image: '/images/amazon.svg',
        name: 'Amazon',
        location: 'Seattle, WA',
        activation: 120
    },
    {
        image: '/images/apple.png',
        name: 'Apple',
        location: 'Cupertino, CA',
        activation: 90
    },
    {
        image: '/images/facebook.webp',
        name: 'Meta (Facebook)',
        location: 'Menlo Park, CA',
        activation: 75
    },
    {
        image: '/images/ibm.jpg',
        name: 'IBM',
        location: 'Armonk, NY',
        activation: 50
    },
    {
        image: '/images/tesla.png',
        name: 'Tesla',
        location: 'Palo Alto, CA',
        activation: 60
    },
    {
        image: '/images/salesforce.png',
        name: 'Salesforce',
        location: 'San Francisco, CA',
        activation: 70
    }
];

const Page = () => {
    const controls = useAnimation();
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    React.useEffect(() => {
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
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } }
        }}
        
        className=''>
            <div className='flex justify-center items-center text-center lg:p-0 md:p-0 sm:p-2 p-2 flex-col mt-16'>
                <div>
                    <h1 className='sm:text-3xl text-2xl font-extrabold title-font text-gray-800 mb-2'>Top Recruiters</h1>
                </div>
                <div>
                    <p className='text-base leading-relaxed xl:w-full lg:w-full mx-auto w-full text-gray-500'>
                        Discover your next career move, freelance gig, or internship
                    </p>
                </div>
            </div>
            <div

                className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6  lg:mt-16 md:mt-12 sm:mt-9 mt-9 lg:w-[85%] md:w-[90%] sm:w-[90%] w-[90%] mx-auto'>
                {recruiters.map((recruiter, index) => (
                    <div key={index} className='recruiter-card cards-animate cursor-pointer hover:border-2 hover:border-blue-300 border-2 border-slate-200 rounded-lg p-4'>
                        <div className='flex justify-start items-start gap-2'>
                            <div>
                                <Image height={1000} width={1000} src={recruiter.image} alt={recruiter.name} className='w-12 h-12 object-center object-cover rounded-full' />
                            </div>
                            <div className='flex flex-col'>
                                <div>
                                    <h1 className='text-lg font-bold text-blue-900'>{recruiter.name}</h1>
                                </div>
                                <div>
                                    {/* Placeholder for rating logic */}
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 mt-4'>
                            <div className='flex gap-0.5'>
                                <CiLocationOn />
                                <div className='text-[13px] font-bold text-gray-500'>{recruiter.location}</div>
                            </div>
                            <div className='flex gap-0.5'>
                                <div className='text-[13px] font-bold text-gray-500'>{recruiter.activation} Jobs Open</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default Page;

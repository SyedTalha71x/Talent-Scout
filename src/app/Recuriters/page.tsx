"use client";
import React, { useState, useEffect } from 'react';
import { CiLocationOn } from "react-icons/ci";
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import axios from 'axios';

const Page = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/getRecuiter');
                setData(response.data.recuiters);
            } catch (error) {
                console.error("Error fetching recruiters data:", error);
            }
        };
        fetchData();
    }, []);

    const controls = useAnimation();
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    return (
        <div>
            <div className='flex justify-center items-center text-center flex-col mt-16'>
                <div>
                    <h1 className='text-gray-800 text-4xl font-extrabold mb-2'>Top Recruiters</h1>
                </div>
                <div>
                    <p className='text-gray-600 text-md leading-relaxed'>
                        Discover your next career move, freelance gig, or internship
                    </p>
                </div>
            </div>
            <motion.div
                ref={ref}
                initial="hidden"
                animate={controls}
                variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } }
                }}
                className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 lg:w-[85%] md:w-[90%] sm:w-[90%] w-[90%] mx-auto'>
                {data.map((recruiter: any, index) => (
                    <div key={index} className='recruiter-card cards-animate cursor-pointer hover:border-2 hover:border-blue-300 border-2 border-slate-200 rounded-lg p-4'>
                        <div className='flex justify-start items-start gap-2'>
                            <div>
                                <Image height={1000} width={1000} src={recruiter.image} alt={recruiter.name} className='w-14 h-14 object-cover rounded-lg' />
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
            </motion.div>
        </div>
    );
};

export default Page;

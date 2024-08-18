"use client";
import React, { useState, useEffect } from 'react'
import { CiLocationOn } from "react-icons/ci";
import { PiBriefcaseLight } from "react-icons/pi";
import { CiClock2 } from "react-icons/ci";
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios'
import Link from 'next/link';

const jobs = [
    {
        company: "Apple",
        location: "New York, US",
        role: "Senior Mern Stack Developer",
        type: "Full Time",
        time: "10 minutes ago",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate dolor quis iure officiis, deleniti at nam amet. Repudiandae velit enim ut nisi consequuntur ea, dicta porro et veritatis corporis reiciendis?",
        skills: ["React", "TypeScript"],
        salary: "$500/Hour",
        img: "https://images.pexels.com/photos/544295/pexels-photo-544295.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
        company: "Apple",
        location: "New York, US",
        role: "Senior Mern Stack Developer",
        type: "Full Time",
        time: "10 minutes ago",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate dolor quis iure officiis, deleniti at nam amet. Repudiandae velit enim ut nisi consequuntur ea, dicta porro et veritatis corporis reiciendis?",
        skills: ["React", "TypeScript"],
        salary: "$500/Hour",
        img: "https://images.pexels.com/photos/544295/pexels-photo-544295.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
        company: "Apple",
        location: "New York, US",
        role: "Senior Mern Stack Developer",
        type: "Full Time",
        time: "10 minutes ago",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate dolor quis iure officiis, deleniti at nam amet. Repudiandae velit enim ut nisi consequuntur ea, dicta porro et veritatis corporis reiciendis?",
        skills: ["React", "TypeScript"],
        salary: "$500/Hour",
        img: "https://images.pexels.com/photos/544295/pexels-photo-544295.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
        company: "Apple",
        location: "New York, US",
        role: "Senior Mern Stack Developer",
        type: "Full Time",
        time: "10 minutes ago",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate dolor quis iure officiis, deleniti at nam amet. Repudiandae velit enim ut nisi consequuntur ea, dicta porro et veritatis corporis reiciendis?",
        skills: ["React", "TypeScript"],
        salary: "$500/Hour",
        img: "https://images.pexels.com/photos/544295/pexels-photo-544295.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
        company: "Apple",
        location: "New York, US",
        role: "Senior Mern Stack Developer",
        type: "Full Time",
        time: "10 minutes ago",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate dolor quis iure officiis, deleniti at nam amet. Repudiandae velit enim ut nisi consequuntur ea, dicta porro et veritatis corporis reiciendis?",
        skills: ["React", "TypeScript"],
        salary: "$500/Hour",
        img: "https://images.pexels.com/photos/544295/pexels-photo-544295.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
        company: "Apple",
        location: "New York, US",
        role: "Senior Mern Stack Developer",
        type: "Full Time",
        time: "10 minutes ago",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate dolor quis iure officiis, deleniti at nam amet. Repudiandae velit enim ut nisi consequuntur ea, dicta porro et veritatis corporis reiciendis?",
        skills: ["React", "TypeScript"],
        salary: "$500/Hour",
        img: "https://images.pexels.com/photos/544295/pexels-photo-544295.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
        company: "Apple",
        location: "New York, US",
        role: "Senior Mern Stack Developer",
        type: "Full Time",
        time: "10 minutes ago",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate dolor quis iure officiis, deleniti at nam amet. Repudiandae velit enim ut nisi consequuntur ea, dicta porro et veritatis corporis reiciendis?",
        skills: ["React", "TypeScript"],
        salary: "$500/Hour",
        img: "https://images.pexels.com/photos/544295/pexels-photo-544295.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
        company: "Apple",
        location: "New York, US",
        role: "Senior Mern Stack Developer",
        type: "Full Time",
        time: "10 minutes ago",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate dolor quis iure officiis, deleniti at nam amet. Repudiandae velit enim ut nisi consequuntur ea, dicta porro et veritatis corporis reiciendis?",
        skills: ["React", "TypeScript"],
        salary: "$500/Hour",
        img: "https://images.pexels.com/photos/544295/pexels-photo-544295.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    // Add 7 more job objects here with different details
];

const Page = () => {
    const [jobs, setjobs] = useState([])
    const controls = useAnimation();
    const CreatedAt = new Date().getMinutes();
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/Jobs/getJob`);
                console.log(response.data.jobs);
                setjobs(response.data.jobs);
            }
            catch (error: any) {
                console.log("Error while fetching data ", error);

            }
        }
        fetchData();
    }, [])

    return (
        <div className=" px-4 my-8 gap-12 max-w-[1400px] mx-auto">
            <div className='flex justify-center items-center flex-col text-center'>
                <h2 className="sm:text-3xl text-2xl font-extrabold title-font text-gray-800 mb-2">Jobs of the day</h2>
                <p className="text-base leading-relaxed xl:w-full lg:w-full w-full mx-auto text-gray-500">Search and connect with the right candidates faster.</p>
            </div>

            <motion.div
                ref={ref}
                initial="hidden"
                animate={controls}
                variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } }
                }}

                className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 max-md:max-w-lg mx-auto mt-20">
                {jobs.map((job: any, index: any) => (
                    <Link href={`/Jobs/${job._id}`} key={index} className='bg-blue-50 rounded-lg shadow p-6 card'>
                        <div className="flex gap-3 justify-start items-start">
                            <div>
                                <img src={job.image} className='rounded-xl h-12 w-12 object-cover' alt={job.company} />
                            </div>
                            <div className='flex flex-col'>
                                <h1 className='text-lg font-bold text-blue-950'>{job.company}</h1>
                                <div className='flex mt-0.5'>
                                    <CiLocationOn />
                                    <div className='text-[12px] text-gray-500'>{job.location}</div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-4'>
                            <h1 className='text-lg text-violet-950 font-bold'>{job.title}</h1>
                        </div>
                        <div className='flex items-center gap-5 mt-2'>
                            <div className='flex gap-0.5'>
                                <PiBriefcaseLight />
                                <div className='text-[13px] text-gray-500'>{job.jobType}</div>
                            </div>
                            <div className='flex gap-0.5'>
                                <CiClock2 />
                                <div className='text-[13px] text-gray-500'>{new Date(job.createdAt).toISOString().split('T')[0]}</div>
                            </div>
                        </div>
                        <div className='mt-5'>
                            <p className='text-sm text-gray-500'>{job.description.slice(0,100)}</p>
                        </div>
                        <div className='mt-5 flex items-center gap-2'>
                            {job.skills.slice(0, 3).map((skill: any, i: any) => (
                                <div key={i} className='bg-slate-200 rounded-md py-1.5 px-4 text-gray-700 text-[12px]'>{skill}</div>
                            ))}
                        </div>
                        <div className='mt-4 flex justify-between items-center'>
                            <div className='flex'>
                                <span className='text-purple-800 font-bold text-[20px]'>{job.salary}$/</span>
                                <div className='text-gray-600 text-[16px] ml-0.5 mt-1'>Hour</div>
                            </div>
                            <button className='bg-purple-600 text-white rounded-md py-1.5 px-5 text-sm'>Apply Now</button>
                        </div>
                    </Link>
                ))}
            </motion.div>
            <div className='flex justify-center items-center mt-8'>
                <Link href={"/JobForum"}>
                    <button className='bg-purple-600 text-white nav-btns py-2.5 px-10 lg:text-md md:text-md sm:text-sm text-sm rounded-md'>Find More Jobs</button>
                </Link>
            </div>
        </div>
    )
}

export default Page

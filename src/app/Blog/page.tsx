"use client";
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import blogs from '@/utils/sampleJson/blogs.json'


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
            className=" lg:mt-32 md:mt-32 sm:mt-20 mt-20" id='blogs'>
            <div className="lg:w-[1280px] md:w-[90%] sm:w-[90%] w-[90%] mx-auto">
                <div className="text-center">
                    <h2 className="sm:text-3xl text-2xl font-extrabold title-font text-gray-800 ">Our Latest Blogs</h2>
                    <p className='text-base leading-relaxed xl:w-full lg:w-full w-full mx-auto text-gray-500'>Get the latest news, updates and tips</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-md:max-w-lg mx-auto">
                    {blogs.map((blog) => (
                        <Link href={`DetailBlogs/${blog.slug}`}>
                            <div key={blog.id} className="bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative top-0 hover:-top-2 transition-all duration-300">
                                <Image height={1000} width={1000} src={blog.image} alt={blog.title} className="w-full h-60 object-cover" />
                                <div className="p-6">
                                    <span className="text-sm block text-gray-400 mb-2">{blog.date} | BY {blog.author}</span>
                                    <h3 className="text-xl font-bold text-[#333]">{blog.title}</h3>
                                    <hr className="my-6" />
                                    <p className="text-gray-400 text-sm">{blog.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className='flex justify-center items-center mt-7'>
                    <Link href={"/Blogs"}>
                        <button className='bg-purple-600 text-white py-2 px-6 lg:text-lg md:text-lg sm:text-sm text-sm rounded-md nav-btns'>More Blogs</button>
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}

export default Page;

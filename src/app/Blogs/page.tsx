"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import blogs from '@/utils/sampleJson/blogs.json'; // Ensure the path is correct for your project

const Page = () => {
    return (
        <div>
            <div className='relative bg-cover bg-center' style={{ backgroundImage: "url('/bg-jobpost.jpg')" }}>
                <div className='absolute inset-0 bg-slate-600 opacity-75'></div>
                <div className='relative flex justify-center items-center text-center flex-col lg:p-36 md:p-26 sm:p-20 p-16'>
                    <h1 className='text-white sm:text-3xl text-2xl font-extrabold title-font'>Blogs</h1>
                    <p className='text-base leading-relaxed xl:w-full lg:w-full w-full mx-auto text-gray-300 mt-1'>Checkout our latest blogs!</p>
                </div>
            </div>
            <div className='lg:w-[1280px] md:w-[90%] sm:w-[90%] w-[90%] mx-auto'>
                <div>
                    <h1 className='text-3xl text-gray-800 font-extrabold mt-10 flex justify-start items-start'>Latest Blogs</h1>
                    <p className='text-gray-500 mt-1 w-full font-semibold'>See our latest blogs which will blow your mind!</p>
                </div>
                {/* Latest Blogs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 max-md:max-w-lg mx-auto">
                    {blogs.map((blog) => (
                        <Link key={blog.id} href={`/DetailBlogs/${blog.slug}`}>
                            <div className="bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative top-0 hover:-top-2 transition-all duration-300">
                                <Image height={1000} width={1000} src={blog.image} alt={blog.title} className="w-full h-60 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-[#333]">{blog.title}</h3>
                                    <hr className="my-6" />
                                    <p className="text-gray-400 text-sm">{blog.description.slice(0,200)}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Page;

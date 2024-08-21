"use client";
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import blogs from '@/utils/sampleJson/blogs.json';
import Image from 'next/image';
import Banner from '../../Components/Partials/Banner/banner';
import { useRouter } from 'next/navigation';

const Page = ({ params }) => {
    const newBlogs = blogs.find((item) => item.slug === params.slug);
    const router = useRouter();

    const redirectToDynamicRoute = (slug) => {
        router.push(`${slug}`)
    }

    const controls = useAnimation();
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    return (
        <>
            <main className="pt-8 pb-16 lg:pt-24 lg:pb-20 bg-white dark:bg-gray-900">
                <div className="flex justify-between px-4 ">
                    <article className="lg:w-[80%] md:w-[80%] sm:w-full w-full mx-auto flex flex-col md:flex-row gap-6">
                        {/* Article text content */}
                        <div className="w-full md:w-[70%]">
                            <header className="mb-4 lg:mb-6 not-format">
                                <address className="flex items-center mb-6 not-italic">
                                    <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                        <Image height={1000} width={1000} className="mr-4 w-16 h-16 object-cover object-top rounded-full" src={newBlogs.authorImage} alt={newBlogs.author} />
                                        <div>
                                            <a href="#" rel="author" className="text-xl font-bold text-gray-900 dark:text-white">{newBlogs.author}</a>
                                            <p className="text-base text-gray-500 dark:text-gray-400">{newBlogs.designation}</p>
                                            <p className="text-base text-gray-500 dark:text-gray-400">
                                                <time>{newBlogs.date}</time>
                                            </p>
                                        </div>
                                    </div>
                                </address>
                            </header>
                            <h1 className="mb-4 text-3xl font-extrabold leading-tight mt-10 text-gray-800 lg:mb-6 lg:text-4xl dark:text-white">{newBlogs.title}</h1>
                            <p className="text-lg text-gray-400 mt-4">{newBlogs.description}</p>
                        </div>

                        {/* Article image (hidden on small screens) */}
                        <div className="w-full md:w-[30%] sm:hidden md:flex justify-end">
                            <Image height={1000} width={1000} src={newBlogs.image} className="h-60 w-full rounded-md object-center object-cover" />
                        </div>
                    </article>
                </div>
            </main>

            <div>
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={controls}
                    variants={{
                        hidden: { opacity: 0, y: 50 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                    }}
                    className="flex justify-center items-center mt-10"
                >
                    <div className="lg:w-[1280px] md:w-[90%] sm:w-[90%] w-[90%] mx-auto">
                        <div className="text-left">
                            <h2 className="sm:text-3xl text-2xl font-extrabold title-font text-gray-800">Related Articles</h2>
                            <p className='text-gray-400 mt-1'>Checkout Related Articles, Learn and gain valuable knowledge </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-md:max-w-lg mx-auto">
                            {blogs.map((blog) => (
                                <div onClick={() => redirectToDynamicRoute(blog.slug)} key={blog.id} className="bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative top-0 hover:-top-2 transition-all duration-300">
                                    <Image height={1000} width={1000} src={blog.image} alt={blog.title} className="w-full h-60 object-cover" />
                                    <div className="p-6">
                                        <span className="text-sm block text-gray-400 mb-2">{blog.date} | BY {blog.author}</span>
                                        <h3 className="text-xl font-bold text-[#333]">{blog.title}</h3>
                                        <hr className="my-6" />
                                        <p className="text-gray-400 text-sm">{blog.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            <Banner />
        </>
    );
};

export default Page;

"use client"
import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const testimonials = [
    {
        name: 'John Doe',
        image: 'https://readymadeui.com/team-2.webp',
        text: 'The service was amazing. I never had to wait that long for my food. The staff was friendly and attentive, and the delivery was impressively prompt at all times.',
        rating: 4,
    },
    {
        name: 'Karolina Adair',
        image: 'https://readymadeui.com/team-3.webp',
        text: 'The service was amazing. I never had to wait that long for my food. The staff was friendly and attentive, and the delivery was impressively prompt at all times.',
        rating: 4,
    },
    {
        name: 'Simon Konecki',
        image: 'https://readymadeui.com/team-4.webp',
        text: 'The service was amazing. I never had to wait that long for my food. The staff was friendly and attentive, and the delivery was impressively prompt at all times.',
        rating: 4,
    },
];

const renderStars = (rating: any) => {

    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return (
        <>
            {Array.from({ length: fullStars }, (_, i) => (
                <svg key={`full-${i}`} className="w-4 fill-[#facc15]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
            ))}
            {Array.from({ length: emptyStars }, (_, i) => (
                <svg key={`empty-${i}`} className="w-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
            ))}
        </>
    );
};

const Page = () => {
    const controls = useAnimation();
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);
    return (
        <div className="mt-[6%] ">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-gray-800 text-4xl font-extrabold">Our Testimonials</h2>
                <p className="text-gray-600 text-md leading-relaxed mt-4">Real Stories, Real Success: Hear from Our Happy Clients</p>
            </div>

            <motion.div
                ref={ref}
                initial="hidden"
                animate={controls}
                variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                }} className="grid md:grid-cols-3 gap-6 max-w-6xl max-md:gap-16 max-md:max-w-lg mx-auto mt-[6%]">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="w-full p-6 rounded-lg mx-auto shadow-[0_4px_14px_-6px_rgba(93,96,127,0.4)] relative bg-slate-100">
                        <Image alt='###' height={1000} width={1000} src={testimonial.image} className="w-14 h-14 rounded-full absolute right-0 left-0 mx-auto -top-7" />
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600 leading-relaxed">{testimonial.text}</p>
                        </div>
                        <div className="flex justify-center space-x-1 mt-6">
                            {renderStars(testimonial.rating)}
                        </div>
                        <div className="mt-6 text-center">
                            <h4 className="text-sm whitespace-nowrap font-bold">{testimonial.name}</h4>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default Page;

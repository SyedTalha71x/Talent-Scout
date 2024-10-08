"use client";
import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface StatCardProps {
    value: number;
    label: string;
    description: string;
}

const useCountAnimation = (value: number, inView: boolean) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (inView) {
            const duration = 2000; // duration in ms
            const frameDuration = 1000 / 90; // 60fps
            const totalFrames = Math.round(duration / frameDuration);
            let frame = 0;

            const counter = setInterval(() => {
                frame++;
                const progress = frame / totalFrames;
                setCount(Math.round(value * progress * 10) / 10);

                if (progress === 1) {
                    clearInterval(counter);
                }
            }, frameDuration);

            return () => clearInterval(counter);
        }
    }, [value, inView]);

    return count;
};

const StatCard: React.FC<StatCardProps> = ({ value, label, description }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true });
    const count = useCountAnimation(value, inView);

    return (
        <div ref={ref} className="text-center">
            <h3 className="lg:text-5xl md:text-4xl sm:text-3xl text-3xl font-extrabold">
                {count}
                {label === "Complete Cases" && <span className="text-blue-600">M+</span>}
                {label === "Our Offices" && <span className="text-blue-600">K</span>}
                {label === "Skilled People" && <span className="text-blue-600">K</span>}
                {label === "Happy Clients" && <span className="text-blue-600">%</span>}
            </h3>
            <p className="text-blue-900 text-lg font-bold mt-3">{label}</p>
            <p className="text-sm text-gray-500 mt-2">{description}</p>
        </div>
    );
};

const Page: React.FC = () => {
    return (
        <div className="p-8 min-h-[350px] flex flex-col items-center justify-center lg:w-[90%] md:w-[85%] mt-10 sm:w-full w-full mx-auto text-[#333]">
            <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-6 max-lg:gap-12">
                <StatCard
                    value={5.4}
                    label="Complete Cases"
                    description="The total number of registered users on the platform."
                />
                <StatCard
                    value={80}
                    label="Our Offices"
                    description="The total revenue generated by the application."
                />
                <StatCard
                    value={100}
                    label="Skilled People"
                    description="The level of user engagement with the application's content and features."
                />
                <StatCard
                    value={99.9}
                    label="Happy Clients"
                    description="The percentage of time the server has been operational and available."
                />
            </div>
        </div>
    );
};

export default Page;

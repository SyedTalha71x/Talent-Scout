"use client"
import React, { useEffect, useRef } from 'react'
import { motion, useAnimation } from "framer-motion"
const MovingText = () => {

    const ref = useRef(null);
    const mainControls = useAnimation();
    const slideControls = useAnimation();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    mainControls.start('visible');
                    slideControls.start('visible');
                }
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 0.5
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [mainControls, slideControls]);
    return (
        <div ref={ref} className='cs-moving_text_wrap lg:w-[80%] md:w-[80%] sm:w-full w-full mx-auto '>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                initial="hidden"
                animate={mainControls}
                className='cs-moving_text_in' >
                <div className='cs-moving_text mt-10  text-center  lg:text-[60px] md:text-[50px] sm:text-[30px] text-[30px] capitalize'>
                    Our reputed world wide partners
                </div>
                <div className='cs-moving_text mt-10 text-center  lg:text-[60px] md:text-[50px] sm:text-[30px] text-[30px] capitalize'>
                    Our reputed world wide partners
                </div>
            </motion.div>
        </div>
    )
}

export default MovingText
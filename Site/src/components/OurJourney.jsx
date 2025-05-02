import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const OurJourney = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: false
    });

    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        } else {
            controls.start('hidden');
        }
    }, [controls, inView]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const imageVariants = {
        hidden: { x: 50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="w-full mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                ref={ref}
                initial="hidden"
                animate={controls}
                variants={containerVariants}
                className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100"
            >
                {/* Description Section (Left) */}
                <motion.div
                    variants={itemVariants}
                    className="p-8 md:w-1/2 flex flex-col justify-center bg-gradient-to-br from-blue-50 to-white"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl font-bold text-gray-800 mb-6 font-serif"
                    >
                        My Journey
                    </motion.h2>

                    <motion.p
                        variants={itemVariants}
                        className="text-gray-600 mb-6 text-justify leading-relaxed"
                    >
                        From a single truck and a small crew to becoming a trusted name in Chennai's construction
                        industry, my path has been paved with both challenges and triumphs.
                    </motion.p>

                    <motion.p
                        variants={itemVariants}
                        className="text-gray-600 mb-6 text-justify leading-relaxed"
                    >
                        Each project we undertake carries our family's reputation, so we approach every foundation,
                        every beam, and every wall with the same care as if we were building our own home.
                    </motion.p>

                    <motion.p
                        variants={itemVariants}
                        className="text-gray-600 mb-6 text-justify leading-relaxed"
                    >
                        Through economic storms and industry changes, one principle has remained constant: <span
                        className="font-semibold text-blue-600">quality speaks louder than words</span>. Our growing
                        portfolio stands as testament to what can be achieved when skill meets determination.
                    </motion.p>

                    <motion.blockquote
                        variants={itemVariants}
                        className="relative p-4 text-xl italic text-center text-gray-700 before:content-['“'] before:text-6xl before:text-gray-200 before:absolute before:left-0 before:top-0"
                    >
                        "The strongest foundations aren't made of concrete – but of character."
                    </motion.blockquote>

                    <motion.div variants={itemVariants}>
                        <button
                            onClick={() => navigate('/about')} // Redirect to About Us page
                            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                        >
                            Learn More
                        </button>
                    </motion.div>
                </motion.div>

                {/* Image Section (Right) */}
                <motion.div
                    variants={imageVariants}
                    className="md:w-1/2 relative overflow-hidden min-h-[400px]"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent z-10"></div>
                    <img
                        src="https://media-hosting.imagekit.io/09a5236dc5d34c22/IMG_2123.JPG?Expires=1839830188&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=OK5ndVr549YYvxOv-Sk8FNt9CuXl0O6I78WRfMbuswzg21Do0nYo0HOQLzV~NZAbROMkYY1Q5uobFkuVPxo5DKJx2vfUP4RpuAGkj7YysmW-0GWEPaCCtzuD7jDuNQxNlsfcxHav9GFbv3nsbRXFjILZu6-00y2kylnYrzDsqK1PpAL5sdpHJeL88xFdvLOJUjaE6n539-K-0fld663RU~ZlpCCb1qz4KPGbvoiUorw6Adt2Z6bBuVNRrdGFaOKMuT3JwBdbH5IN~XvUOcRgPQodPvV1jLWHfhyv5~hhQUyFhMpvHmT3XbISZSqds~e9MIkbUIGc2Yh18srBHSii8Q__"
                        alt="Construction site showing progress"
                        className="absolute w-full h-full object-cover object-top transition-all duration-700 hover:scale-105"
                    />
                </motion.div>

            </motion.div>
        </div>
    );
};

export default OurJourney;
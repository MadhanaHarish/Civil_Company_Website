import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import './StatItem.css';

const StatsSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });
    
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
    
    // Stats data
    const stats = [
        { id: 1, number: 23, label: "Years of Experience", color: "from-blue-500 to-indigo-600" },
        { id: 2, number: 250, label: "Commercial Projects", color: "from-cyan-500 to-blue-600" },
        { id: 3, number: 30, label: "Residential Projects", color: "from-indigo-500 to-purple-600" },
        { id: 4, number: 150, label: "Team Members", color: "from-blue-400 to-indigo-500" },
        { id: 5, number: 12, label: "Lakhs sq ft per year", color: "from-sky-500 to-blue-600" }
    ];
    
    return (
        <section 
            ref={sectionRef} 
            className="py-24 mt-12 overflow-hidden relative"
            style={{
                background: "linear-gradient(to right, #0f172a, #1e293b, #0f172a)"
            }}
        >
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
                <div className="absolute top-1/2 -left-24 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
                <div className="absolute -bottom-24 right-1/3 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
            </div>
            
            <motion.div 
                className="container mx-auto px-4 relative z-10"
                style={{ opacity, scale }}
            >
                <motion.div 
                    className="text-center mb-20"
                    initial={{ y: 30, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <motion.h2 
                        className="text-4xl md:text-5xl font-bold mb-5 text-white"
                        initial={{ y: 20, opacity: 0 }}
                        animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Our Impact In Numbers
                    </motion.h2>
                    <motion.div 
                        className="w-24 h-1.5 bg-gradient-to-r from-blue-400 to-indigo-600 mx-auto mb-8"
                        initial={{ width: 0, opacity: 0 }}
                        animate={isInView ? { width: 96, opacity: 1 } : { width: 0, opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    ></motion.div>
                    <motion.p 
                        className="text-lg text-gray-300 max-w-3xl mx-auto"
                        initial={{ y: 20, opacity: 0 }}
                        animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Decades of excellence in construction with a proven track record of delivering 
                        exceptional projects across Tamil Nadu.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
                    {stats.map((stat, index) => (
                        <StatCard 
                            key={stat.id} 
                            number={stat.number} 
                            label={stat.label} 
                            color={stat.color}
                            delay={0.3 + (index * 0.1)}
                            isVisible={isInView}
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

const StatCard = ({ number, label, color, delay, isVisible }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        let start = 0;
        if (isVisible) {
            // if the number is more than 100, increment by larger amounts for smoother animation
            const incrementSize = number > 100 ? 5 : 1;
            const duration = 2500; // animation duration in ms
            const totalIncrements = Math.ceil(number / incrementSize);
            const incrementTime = duration / totalIncrements;
            
            // Set up the counter
            const timer = setInterval(() => {
                start += incrementSize;
                if (start > number) {
                    setCount(number);
                    clearInterval(timer);
                } else {
                    setCount(start);
                }
            }, incrementTime);
            
            return () => {
                clearInterval(timer);
            };
        }
    }, [isVisible, number]);
    
    const variants = {
        hidden: { 
            opacity: 0,
            y: 60,
            scale: 0.9
        },
        visible: { 
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                delay,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    return (
        <motion.div
            className="h-full"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={variants}
        >
            <div className={`stats-card shimmer glow h-full bg-gradient-to-br ${color} p-6 rounded-2xl shadow-lg backdrop-blur-sm bg-opacity-20 text-center border border-gray-700 flex flex-col justify-center relative overflow-hidden group transition-all duration-300`}>
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                
                {/* Animated circles */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white rounded-full mix-blend-overlay filter blur-xl opacity-10 group-hover:opacity-20 transition-all duration-300"></div>
                
                <div className="relative z-10">
                    <div className="flex items-center justify-center">
                        <motion.div 
                            className="text-5xl sm:text-6xl md:text-7xl font-bold text-white counter"
                            initial={{ scale: 0.8 }}
                            animate={isVisible ? { scale: 1 } : { scale: 0.8 }}
                            transition={{ 
                                duration: 0.5, 
                                delay: delay + 0.3,
                                type: "spring",
                                stiffness: 200
                            }}
                        >
                            {count}
                        </motion.div>
                        {number >= 100 && (
                            <motion.div 
                                className="text-3xl md:text-4xl text-white font-bold ml-1"
                                initial={{ opacity: 0 }}
                                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ duration: 0.3, delay: delay + 0.6 }}
                            >
                                +
                            </motion.div>
                        )}
                    </div>
                    <motion.div 
                        className="mt-3 text-sm md:text-base text-gray-100 font-medium"
                        initial={{ opacity: 0 }}
                        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.3, delay: delay + 0.4 }}
                    >
                        {label}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default StatsSection; 
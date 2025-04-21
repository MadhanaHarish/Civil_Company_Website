import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AboutUs = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: false
    });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
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
        <div className="mt-20 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 to-white opacity-30"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-10"></div>
            </div>

            <motion.div
                ref={ref}
                initial="hidden"
                animate={controls}
                variants={containerVariants}
            >
                {/* Our Story Section */}
                <div className="bg-white/90 py-16 backdrop-blur-sm">
                    <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
                        {/* Content */}
                        <motion.div
                            variants={itemVariants}
                            className="flex-1"
                        >
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                                Our Story
                            </h2>
                            <motion.p
                                variants={itemVariants}
                                className="text-gray-700 mb-4 text-justify"
                            >
                                In founding Landmark Construction, it was my dream to build an environment that fosters
                                and rewards everyone's achievements and pride in all aspects of the company's efforts.
                            </motion.p>
                            <motion.p
                                variants={itemVariants}
                                className="text-gray-700 mb-4 text-justify"
                            >
                                I felt that if the company could focus its attention on creating a unique bond with every
                                employee-owner, they would create a positive client relationship based on our core
                                values at every level in the company.
                            </motion.p>
                            <motion.p
                                variants={itemVariants}
                                className="text-sm text-gray-500"
                            >
                                <strong>Selvaraj</strong> – Founder, Chairman
                            </motion.p>
                        </motion.div>

                        {/* Image */}
                        <motion.div
                            variants={imageVariants}
                            className="flex-1 relative overflow-hidden rounded-lg shadow-xl"
                        >
                            <img
                                src="https://static.vecteezy.com/system/resources/previews/009/174/438/large_2x/engineer-man-working-in-building-site-young-worker-man-working-in-construction-site-construction-and-civil-engineer-concept-photo.JPG"
                                alt="Our Story"
                                className="w-full h-64 md:h-80 object-cover rounded-lg hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                        </motion.div>
                    </div>
                </div>

                {/* Our Mission Section */}
                <div className="bg-blue-50/50 py-16 backdrop-blur-sm">
                    <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row-reverse items-center gap-8">
                        {/* Content */}
                        <motion.div
                            variants={itemVariants}
                            className="flex-1"
                        >
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                                Our Mission & Purpose
                            </h2>
                            <motion.p
                                variants={itemVariants}
                                className="text-gray-700 mb-4 text-justify"
                            >
                                Since our founding, Landmark has grown immensely while maintaining the focus on our
                                people that Mike Clune initiated.
                            </motion.p>
                            <motion.p
                                variants={itemVariants}
                                className="text-gray-700 mb-4 text-justify"
                            >
                                As we continue to evolve, we know that our strengths are rooted in our shared fate.
                                Increasing goals, expanding footprint, and working in new markets all require people
                                across our organization to think, act, and grow collaboratively toward the same purpose.
                            </motion.p>
                        </motion.div>

                        {/* Image */}
                        <motion.div
                            variants={imageVariants}
                            className="flex-1 relative overflow-hidden rounded-lg shadow-xl"
                        >
                            <img
                                src="https://i0.wp.com/osmacom.com/wp-content/uploads/2021/08/two-colleagues-edited-2.jpg?fit=%2C&ssl=1"
                                alt="Our Mission & Purpose"
                                className="w-full h-64 md:h-80 object-cover rounded-lg hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                        </motion.div>
                    </div>
                </div>

                {/* Teamwork Section */}
                <div className="bg-white/90 py-16 backdrop-blur-sm">
                    <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
                        {/* Content */}
                        <motion.div
                            variants={itemVariants}
                            className="flex-1"
                        >
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                                TEAMWORK
                            </h2>
                            <motion.p
                                variants={itemVariants}
                                className="text-gray-700 mb-4 text-justify"
                            >
                                At Landmark, teamwork is the foundation of every successful project. We work with
                                architects, project managers, trade partners, clients and stakeholders to bring each
                                project to life.
                            </motion.p>
                            <motion.p
                                variants={itemVariants}
                                className="text-gray-700 mb-4 text-justify"
                            >
                                Our culture of co-leadership and cross-departmental collaboration,
                                spanning every regional office, fosters an environment where diverse perspectives
                                thrive.
                            </motion.p>
                        </motion.div>

                        {/* Image */}
                        <motion.div
                            variants={imageVariants}
                            className="flex-1 relative overflow-hidden rounded-lg shadow-xl"
                        >
                            <img
                                src="https://www.shutterstock.com/image-photo/engineer-team-hand-front-building-260nw-789139726.jpg"
                                alt="Our Story"
                                className="w-full h-64 md:h-80 object-cover rounded-lg hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Footer */}
            <motion.footer
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gray-100 py-12 mt-12"
            >
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h3 className="text-red-600 font-bold mb-4">LANDMARK CONSTRUCTION</h3>
                        <p className="text-gray-700 text-sm">
                            Copyright © 2025 Landmark Construction Company. All rights reserved.
                        </p>
                        <p className="text-gray-600 text-xs mt-2">
                            Landmark Projects, No.55J, Dharapuram Road, Cheran Nagar, Vellakovil-638111,
                            Kangayam(TK), Tirupur(DT).
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h3 className="text-red-600 font-bold mb-4">QUICK LINKS</h3>
                        {["Who We Are", "News & Insights", "Contact", "Transparency in Coverage", "Privacy Policy"].map((link, i) => (
                            <motion.a
                                key={i}
                                href="#"
                                className="text-gray-700 block mb-2 hover:text-red-600 transition-colors"
                                whileHover={{ x: 5 }}
                            >
                                {link}
                            </motion.a>
                        ))}
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h3 className="text-red-600 font-bold mb-4">SOCIAL</h3>
                        {["LinkedIn", "Instagram", "Facebook"].map((social, i) => (
                            <motion.a
                                key={i}
                                href="#"
                                className="text-gray-700 block mb-2 hover:text-red-600 transition-colors"
                                whileHover={{ x: 5 }}
                            >
                                {social}
                            </motion.a>
                        ))}
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h3 className="text-red-600 font-bold mb-4">CONTACT</h3>
                        {["National Presence", "Media Inquiries"].map((contact, i) => (
                            <motion.a
                                key={i}
                                href="#"
                                className="text-gray-700 block mb-2 hover:text-red-600 transition-colors"
                                whileHover={{ x: 5 }}
                            >
                                {contact}
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
            </motion.footer>
        </div>
    );
}

export default AboutUs;
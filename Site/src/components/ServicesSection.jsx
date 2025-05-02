import React from 'react';
import { motion } from 'framer-motion';
import { FaBuilding, FaHome, FaIndustry, FaTools, FaRulerCombined, FaHardHat } from 'react-icons/fa';

const ServicesSection = () => {
  const services = [
    {
      icon: <FaBuilding className="text-red-500 text-4xl mb-4" />,
      title: "Commercial Construction",
      description: "State-of-the-art commercial buildings, offices, retail spaces, and corporate headquarters designed for maximum functionality and aesthetic appeal."
    },
    {
      icon: <FaHome className="text-red-500 text-4xl mb-4" />,
      title: "Residential Projects",
      description: "Luxurious homes, residential complexes, and apartments built with meticulous attention to detail, comfort, and modern living standards."
    },
    {
      icon: <FaIndustry className="text-red-500 text-4xl mb-4" />,
      title: "Industrial Construction",
      description: "Purpose-built facilities for manufacturing, warehousing, and industrial operations with focus on efficiency, safety, and durability."
    },
    {
      icon: <FaTools className="text-red-500 text-4xl mb-4" />,
      title: "Renovations & Remodeling",
      description: "Transform existing structures with our expert renovation services that breathe new life into older buildings while preserving their character."
    },
    {
      icon: <FaRulerCombined className="text-red-500 text-4xl mb-4" />,
      title: "Architectural Design",
      description: "Comprehensive architectural design services that blend creativity, functionality, and sustainability to create remarkable spaces."
    },
    {
      icon: <FaHardHat className="text-red-500 text-4xl mb-4" />,
      title: "Construction Management",
      description: "End-to-end project management ensuring timely completion, quality control, and optimal resource utilization throughout the construction process."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
          <motion.div 
            className="w-24 h-1.5 bg-gradient-to-r from-red-500 to-red-700 mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          ></motion.div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive construction solutions with unmatched quality and customer satisfaction. 
            Our services cover every aspect of the building process.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="bg-gray-50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -10 }}
            >
              <div className="text-center">
                {service.icon}
                <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 
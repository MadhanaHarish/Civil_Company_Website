import React from 'react';
import { motion } from 'framer-motion';
import { FaAward, FaUsers, FaHandshake, FaHardHat } from 'react-icons/fa';

const AboutUsSection = () => {
  const values = [
    {
      icon: <FaAward className="text-3xl text-red-500" />,
      title: "Excellence",
      description: "We strive for excellence in every project, delivering high-quality construction that exceeds expectations."
    },
    {
      icon: <FaUsers className="text-3xl text-red-500" />,
      title: "Teamwork",
      description: "Our skilled team works collaboratively to ensure efficient project execution and superior results."
    },
    {
      icon: <FaHandshake className="text-3xl text-red-500" />,
      title: "Integrity",
      description: "We maintain the highest standards of honesty and transparency in all our business dealings."
    },
    {
      icon: <FaHardHat className="text-3xl text-red-500" />,
      title: "Safety",
      description: "Safety is our priority, ensuring secure environments for our workers, clients, and communities."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Who We Are</h2>
            <motion.div 
              className="w-24 h-1.5 bg-gradient-to-r from-red-500 to-red-700 mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            ></motion.div>
            <p className="text-gray-600 mb-6 text-lg">
              Landmark Construction is a premier construction company with over 23 years of 
              experience delivering exceptional projects across Tamil Nadu. We specialize in 
              commercial, residential, and industrial construction services.
            </p>
            <p className="text-gray-600 mb-6 text-lg">
              Our team of experienced professionals is dedicated to bringing your vision to life 
              with attention to detail, quality materials, and innovative construction techniques.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {["Quality Assurance", "Timely Delivery", "Cost Effective", "Innovative Solutions"].map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More About Us
            </motion.button>
          </motion.div>
          
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative z-10 overflow-hidden rounded-lg shadow-xl">
              <img 
                src="/images/about-us.jpg" 
                alt="Our construction team" 
                className="w-full h-auto rounded-lg object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';
                }}
              />
              
              {/* Experience badge */}
              <div className="absolute -left-6 -bottom-6 w-36 h-36 bg-red-600 rounded-full flex flex-col items-center justify-center text-white shadow-lg transform rotate-12">
                <span className="text-4xl font-bold">23+</span>
                <span className="text-sm">Years Experience</span>
              </div>
            </div>
            
            {/* Background decorative element */}
            <div className="absolute top-12 -right-6 w-72 h-72 bg-gray-200 rounded-lg -z-10 transform rotate-6"></div>
          </motion.div>
        </div>
        
        {/* Our Values Section */}
        <div className="mt-24">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <motion.div 
              className="w-24 h-1.5 bg-gradient-to-r from-red-500 to-red-700 mx-auto mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            ></motion.div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our values define who we are and guide our approach to construction excellence.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection; 
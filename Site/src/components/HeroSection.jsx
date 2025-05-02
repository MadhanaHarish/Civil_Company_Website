import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center bg-gray-900 overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
        <img 
          src="/images/hero-bg.jpg" 
          alt="Construction site" 
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2089&q=80';
          }}
        />
        
        {/* Animated particles */}
        <div className="absolute inset-0 z-20">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.3,
                animation: `float ${Math.random() * 10 + 15}s linear infinite`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 z-30 relative">
        <motion.div 
          className="max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Building <span className="text-red-500">Excellence</span>
            <br />Creating <span className="text-red-500">Landmarks</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-200 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Premier construction company with over 23 years of expertise in 
            delivering exceptional projects across Tamil Nadu.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link 
              to="/projects" 
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              Our Projects
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30">
        <motion.div 
          className="w-8 h-12 border-2 border-white rounded-full flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.div 
            className="w-1.5 h-3 bg-white rounded-full mt-2"
            animate={{ 
              y: [0, 8, 0],
              opacity: [1, 0.5, 1]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
        </motion.div>
      </div>
      
      {/* Custom CSS for floating animation */}
      <style jsx="true">{`
        @keyframes float {
          0% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-100vh) scale(0.5);
          }
          100% {
            transform: translateY(-200vh) scale(0);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection; 
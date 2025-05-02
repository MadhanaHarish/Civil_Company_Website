import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Card = ({ isLoggedIn, project }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (!isLoggedIn) {
            navigate("/login");
        } else {
            navigate(`/projects/${project._id}`);
        }
    }

    // Define status badge colors
    const getStatusColor = () => {
        const status = project.status || "Live";
        
        switch(status.toLowerCase()) {
            case "completed":
                return "bg-green-100 text-green-800 border-green-200";
            case "live":
                return "bg-blue-100 text-blue-800 border-blue-200";
            case "pending":
                return "bg-amber-100 text-amber-800 border-amber-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    return (
        <motion.div 
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
        >
            <div className="relative">
                <motion.div
                    className="overflow-hidden h-48"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                >
                    <img 
                        src={project.pictures && project.pictures[0] ? project.pictures[0] : "https://via.placeholder.com/400x300?text=No+Image"} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500"
                    />
                </motion.div>
                
                {/* Status badge */}
                <div className={`absolute top-3 right-3 px-3 py-1 text-xs font-medium rounded-full ${getStatusColor()} border`}>
                    {project.status || "Live"}
                </div>
            </div>
            
            <div className="p-4 space-y-3" onClick={handleClick}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{project.title}</h3>
                
                <div className="space-y-2">
                    <div className="flex items-center text-sm">
                        <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-gray-700">{project.tlName}</span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                        <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-gray-700">{project.location}</span>
                    </div>

                    {project.type && (
                        <div className="flex items-center text-sm">
                            <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span className="text-gray-700">{project.type}</span>
                        </div>
                    )}
                </div>
                
                <motion.div
                    className="pt-4 flex items-center justify-end text-sm font-medium text-blue-600 mt-4"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                >
                    <span>View Details</span>
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default Card;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ProjectDetails = ({ loggedInRole }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const [message, setMessage] = useState({ text: "", type: "" });
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        type: "",
        tlName: "",
        tlEmail: "",
        pictures: [],
        status: "",
        customerEmail: "",
    });

    useEffect(() => {
        const fetchProject = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://civil-company-website.onrender.com/api/projects/${id}`);
                setProject(response.data);
                setFormData({
                    title: response.data.title,
                    description: response.data.description,
                    location: response.data.location,
                    type: response.data.type,
                    tlName: response.data.tlName,
                    tlEmail: response.data.tlEmail,
                    pictures: response.data.pictures.join(", "),
                    status: response.data.status,
                    customerEmail: response.data.customerEmail,
                });
                setTimeout(() => setLoading(false), 300); // Smooth transition
            } catch (error) {
                console.error("Error fetching project details:", error);
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedData = {
                ...formData,
                pictures: formData.pictures.split(",").map((pic) => pic.trim()),
            };
            const response = await axios.put(`http://localhost:5000/api/projects/${id}`, updatedData);
            setProject(response.data.project);
            setIsEditing(false);
            setMessage({ text: "Project updated successfully!", type: "success" });
            
            // Clear the success message after 3 seconds
            setTimeout(() => {
                setMessage({ text: "", type: "" });
            }, 3000);
        } catch (error) {
            console.error("Error updating project:", error);
            setMessage({ text: "Failed to update project. Please try again.", type: "error" });
            
            // Clear the error message after 5 seconds
            setTimeout(() => {
                setMessage({ text: "", type: "" });
            }, 5000);
        }
    };

    const handleImageChange = (index) => {
        setActiveImage(index);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        },
        exit: { opacity: 0 }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { duration: 0.4 }
        }
    };

    // Skeleton loading component
    const SkeletonLoading = () => (
        <div className="w-full max-w-5xl mx-auto px-4 py-8">
            <div className="animate-pulse">
                <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-4 w-5/6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-12 bg-gray-200 rounded-lg"></div>
                    ))}
                </div>
            </div>
        </div>
    );

    if (loading) {
        return <SkeletonLoading />;
    }

    if (!project && !loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Project Not Found</h1>
                    <p className="text-gray-600 mb-4">The project you're looking for doesn't exist or has been removed.</p>
                    <button 
                        onClick={() => navigate(-1)} 
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div 
                className="max-w-5xl mx-auto"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={containerVariants}
            >
                <AnimatePresence>
                    {message.text && (
                        <motion.div 
                            className={`mb-6 p-4 rounded-lg ${message.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'} flex items-center justify-between`}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            <p className="font-medium">{message.text}</p>
                            <button 
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => setMessage({ text: "", type: "" })}
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {isEditing ? (
                    <motion.div
                        variants={containerVariants}
                        className="bg-white rounded-xl shadow-lg overflow-hidden"
                    >
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                            <h1 className="text-2xl font-bold text-white">Edit Project</h1>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleUpdate} className="space-y-6">
                                {loggedInRole === "CEO" && (
                                    <motion.div
                                        variants={containerVariants}
                                        className="space-y-6"
                                    >
                                        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                                <input
                                                    type="text"
                                                    name="location"
                                                    value={formData.location}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                        </motion.div>

                                        <motion.div variants={itemVariants}>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                            <textarea
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                rows="4"
                                                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                            ></textarea>
                                        </motion.div>

                                        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                                <input
                                                    type="text"
                                                    name="type"
                                                    value={formData.type}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                                <select
                                                    name="status"
                                                    value={formData.status}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                                >
                                                    <option value="">Select status</option>
                                                    <option value="Live">Live</option>
                                                    <option value="Completed">Completed</option>
                                                </select>
                                            </div>
                                        </motion.div>

                                        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Team Leader</label>
                                                <input
                                                    type="text"
                                                    name="tlName"
                                                    value={formData.tlName}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Team Leader Email</label>
                                                <input
                                                    type="email"
                                                    name="tlEmail"
                                                    value={formData.tlEmail}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                        </motion.div>

                                        <motion.div variants={itemVariants}>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Pictures (comma-separated URLs)</label>
                                            <input
                                                type="text"
                                                name="pictures"
                                                value={formData.pictures}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </motion.div>

                                        <motion.div variants={itemVariants}>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Email</label>
                                            <input
                                                type="email"
                                                name="customerEmail"
                                                value={formData.customerEmail}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </motion.div>
                                    </motion.div>
                                )}

                                {loggedInRole === "Team Leader" && (
                                    <motion.div variants={itemVariants}>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Select status</option>
                                            <option value="Live">Live</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                    </motion.div>
                                )}

                                <motion.div variants={itemVariants} className="flex items-center space-x-4 pt-4">
                                    <motion.button
                                        type="submit"
                                        className="bg-green-600 text-white py-2 px-6 rounded-lg shadow hover:bg-green-700 transition"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Save Changes
                                    </motion.button>
                                    <motion.button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="bg-gray-500 text-white py-2 px-6 rounded-lg shadow hover:bg-gray-600 transition"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Cancel
                                    </motion.button>
                                </motion.div>
                            </form>
                        </div>
                    </motion.div>
                ) : (
                    <>
                        <motion.div 
                            className="bg-white rounded-xl shadow-lg overflow-hidden"
                            variants={containerVariants}
                        >
                            <div className="relative">
                                <motion.img
                                    src={project.pictures[activeImage] || 'https://via.placeholder.com/800x400?text=No+Image+Available'}
                                    alt={project.title}
                                    className="w-full h-72 md:h-96 object-cover"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                />
                                
                                {/* Status badge */}
                                <div className="absolute top-4 right-4">
                                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                                        project.status === 'Live' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                                    }`}>
                                        {project.status}
                                    </span>
                                </div>
                                
                                {/* Image navigation if multiple images */}
                                {project.pictures.length > 1 && (
                                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                                        {project.pictures.map((_, idx) => (
                                            <button 
                                                key={idx}
                                                onClick={() => handleImageChange(idx)}
                                                className={`w-3 h-3 rounded-full ${activeImage === idx ? 'bg-white' : 'bg-gray-400 bg-opacity-60'}`}
                                                aria-label={`View image ${idx + 1}`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                            
                            <div className="p-6 md:p-8">
                                <motion.div variants={itemVariants}>
                                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{project.title}</h1>
                                    <div className="flex items-center text-gray-600 text-sm mb-6">
                                        <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>{project.location}</span>
                                        
                                        <span className="mx-2">•</span>
                                        
                                        <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                        <span>{project.type}</span>
                                    </div>
                                </motion.div>
                                
                                <motion.div variants={itemVariants}>
                                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Description</h2>
                                    <p className="text-gray-600 mb-8 leading-relaxed">{project.description}</p>
                                </motion.div>
                                
                                <motion.div variants={itemVariants}>
                                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Project Details</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="text-sm font-medium text-gray-500">Team Leader</h3>
                                            <p className="mt-1 text-gray-800">{project.tlName}</p>
                                        </div>
                                        
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="text-sm font-medium text-gray-500">Team Leader Email</h3>
                                            <p className="mt-1 text-gray-800">{project.tlEmail}</p>
                                        </div>
                                        
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="text-sm font-medium text-gray-500">Customer Email</h3>
                                            <p className="mt-1 text-gray-800">{project.customerEmail || 'N/A'}</p>
                                        </div>
                                        
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="text-sm font-medium text-gray-500">Status</h3>
                                            <p className="mt-1">
                                                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                                                    project.status === 'Live' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                                }`}>
                                                    {project.status}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                                
                                {(loggedInRole === "CEO" || loggedInRole === "Team Leader") && (
                                    <motion.div variants={itemVariants} className="mt-8 flex justify-end">
                                        <motion.button
                                            onClick={() => setIsEditing(true)}
                                            className="flex items-center space-x-2 bg-blue-600 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-700 transition"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            <span>Edit Project</span>
                                        </motion.button>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                        
                        <motion.div variants={itemVariants} className="mt-6 text-center">
                            <button 
                                onClick={() => navigate(-1)} 
                                className="text-blue-600 hover:text-blue-800 transition font-medium flex items-center justify-center mx-auto"
                            >
                                <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Projects
                            </button>
                        </motion.div>
                    </>
                )}
            </motion.div>
        </div>
    );
};

export default ProjectDetails;
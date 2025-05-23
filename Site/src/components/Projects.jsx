import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card.jsx";
import AddProject from "./AddProject.jsx";
import DeletProject from "./DeletProject.jsx";
import FilterPopup from "./FilterPopup.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const districts = [
    "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kancheepuram",
    "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet",
    "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupattur", "Tiruppur",
    "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"
];

const Projects = ({isLoggedIn, loggedInRole}) => {
    const [showForm, setShowForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        type: "",
        tlName: "",
        tlEmail: "",
        description: "",
        pictures: ""
    });
    const [deleteData, setDeleteData] = useState({
        selectedProject: "",
        reEnterProjectName: ""
    });
    const [message, setMessage] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilterPopup, setShowFilterPopup] = useState(false); 
    const [filteredDistricts, setFilteredDistricts] = useState([]);
    const [filteredTeamLeads, setFilteredTeamLeads] = useState([]);
    const [activeTab, setActiveTab] = useState("all"); // Track active tab

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://civil-company-website.onrender.com/api/projects');
                setProjects(response.data);
                setTimeout(() => setLoading(false), 500); // Slight delay for smoother transition
            } catch (error) {
                console.error('Error fetching projects:', error);
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFilter = (selectedDistricts, selectedTeamLeads) => {
        setFilteredDistricts(selectedDistricts || []); 
        setFilteredTeamLeads(selectedTeamLeads || []); 
        setShowFilterPopup(false);
    };

    const handleDeleteFormChange = (event) => {
        const { name, value } = event.target;
        setDeleteData({ ...deleteData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://civil-company-website.onrender.com/api/projects/add', formData);
            setProjects([...projects, response.data.project]);
            setShowForm(false);
            setFormData({
                title: "",
                location: "",
                type: "",
                tlName: "",
                tlEmail: "",
                description: "",
                pictures: "",
                status: "",
                customerEmail: ""
            });
            setMessage("Project added successfully!");
            setTimeout(() => setMessage(""), 3000); // Auto-dismiss message after 3 seconds
        } catch (error) {
            console.error("Error adding project:", error.response?.data || error.message);
            setMessage(`Error adding project: ${error.response?.data?.message || error.message}`);
            setTimeout(() => setMessage(""), 5000); // Auto-dismiss error after 5 seconds
        }
    };

    const handleDeleteFormSubmit = async (event) => {
        event.preventDefault();
        if (deleteData.selectedProject === deleteData.reEnterProjectName) {
            try {
                await axios.delete(`https://civil-company-website.onrender.com/api/projects/${deleteData.selectedProject}`);
                setProjects(projects.filter(project => project.title !== deleteData.selectedProject));
                setShowDeleteForm(false);
                setDeleteData({
                    selectedProject: "",
                    reEnterProjectName: ""
                });
                setMessage("Project deleted successfully!");
                setTimeout(() => setMessage(""), 3000); // Auto-dismiss message after 3 seconds
            } catch (error) {
                setMessage(`Error deleting project: ${error.response?.data?.message || error.message}`);
                setTimeout(() => setMessage(""), 5000); // Auto-dismiss error after 5 seconds
            }
        } else {
            setMessage("Project names do not match. Please try again.");
            setTimeout(() => setMessage(""), 5000); // Auto-dismiss error after 5 seconds
        }
    };

    const toggleForm = () => {
        setShowForm(!showForm);
        setMessage("");
        if (showDeleteForm) setShowDeleteForm(false);
    };

    const toggleDeleteForm = () => {
        setShowDeleteForm(!showDeleteForm);
        setMessage("");
        if (showForm) setShowForm(false);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredProjects = projects.filter(project =>
        (project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.tlName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.location.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (filteredDistricts.length === 0 || filteredDistricts.includes(project.location)) &&
        (filteredTeamLeads.length === 0 || filteredTeamLeads.some(tl => tl === project.tlName))
    );

    // Filter projects based on active tab
    const displayedProjects = activeTab === "all" 
        ? filteredProjects 
        : activeTab === "live" 
            ? filteredProjects.filter(project => project.status === "Live") 
            : filteredProjects.filter(project => project.status === "Completed");

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.1 
            }
        }
    };
    
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { duration: 0.4 }
        }
    };

    const tabVariants = {
        inactive: { borderBottom: "2px solid transparent" },
        active: { 
            borderBottom: "2px solid #3b82f6",
            transition: { duration: 0.3 }
        }
    };

    // Loading skeleton
    const renderSkeleton = () => {
        return Array(6).fill().map((_, index) => (
            <motion.div 
                key={`skeleton-${index}`}
                className="bg-white rounded-lg shadow-md p-4 h-32"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="flex h-full gap-4 animate-pulse">
                    <div className="bg-gray-200 w-1/3 rounded"></div>
                    <div className="space-y-3 w-2/3">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                </div>
            </motion.div>
        ));
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Projects</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Explore our portfolio of construction projects across Tamil Nadu
                    </p>
                </motion.div>

                {/* Search and filter section */}
                <motion.div 
                    className="mb-10 bg-white p-6 rounded-xl shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="w-full md:w-1/2 relative">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    placeholder="Search by project name, location, or team lead..."
                                    value={searchQuery}
                                    onChange={handleSearch}
                                />
                            </div>
                        </div>

                        <div className="flex space-x-2 w-full md:w-auto">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition flex items-center space-x-2 text-sm font-medium"
                                onClick={() => setShowFilterPopup(true)}
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                                <span>Filter Projects</span>
                            </motion.button>

                            {/* Only show add/delete buttons for CEO */}
                            {loggedInRole === 'CEO' && (
                                <>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-4 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition flex items-center space-x-2 text-sm font-medium"
                                        onClick={toggleForm}
                                    >
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        <span>Add Project</span>
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-4 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition flex items-center space-x-2 text-sm font-medium"
                                        onClick={toggleDeleteForm}
                                    >
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        <span>Delete Project</span>
                                    </motion.button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Status message */}
                    <AnimatePresence>
                        {message && (
                            <motion.div 
                                className={`mt-4 p-3 rounded-lg ${message.includes("Error") ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <p className="text-sm font-medium">{message}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Tab navigation for project types */}
                <div className="mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            {["all", "live", "completed"].map((tab) => (
                                <motion.button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-4 px-1 text-sm font-medium ${activeTab === tab ? "text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                                    variants={tabVariants}
                                    initial="inactive"
                                    animate={activeTab === tab ? "active" : "inactive"}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)} Projects
                                </motion.button>
                            ))}
                        </nav>
                    </div>
                </div>

                {showForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-8"
                    >
                        <AddProject
                            handleFormSubmit={handleFormSubmit}
                            handleFormChange={handleFormChange}
                            formData={formData}
                        />
                    </motion.div>
                )}

                {showDeleteForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-8"
                    >
                        <DeletProject
                            handleDeleteFormChange={handleDeleteFormChange}
                            handleDeleteFormSubmit={handleDeleteFormSubmit}
                            deleteData={deleteData}
                            projects={projects}
                        />
                    </motion.div>
                )}

                {!showForm && !showDeleteForm && (
                    <>
                        {loading ? (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {renderSkeleton()}
                            </motion.div>
                        ) : (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit={{ opacity: 0 }}
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                >
                                    {displayedProjects.length > 0 ? (
                                        displayedProjects.map((project, index) => (
                                            <motion.div
                                                key={`${project._id}-${index}`}
                                                variants={itemVariants}
                                                className="h-full"
                                            >
                                                <Card 
                                                    project={project} 
                                                    isLoggedIn={isLoggedIn} 
                                                />
                                            </motion.div>
                                        ))
                                    ) : (
                                        <motion.div
                                            className="col-span-full py-12 flex flex-col items-center justify-center text-center"
                                            variants={itemVariants}
                                        >
                                            <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                            </svg>
                                            <h3 className="text-xl font-medium text-gray-900">No projects found</h3>
                                            <p className="mt-2 text-gray-500">
                                                {searchQuery || filteredDistricts.length > 0 || filteredTeamLeads.length > 0 
                                                    ? "Try adjusting your search or filter criteria" 
                                                    : `No ${activeTab === "all" ? "" : activeTab} projects available at this time`}
                                            </p>
                                        </motion.div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        )}
                    </>
                )}
            </div>

            {/* Filter Popup */}
            <AnimatePresence>
                {showFilterPopup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                        onClick={() => setShowFilterPopup(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25 }}
                            className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <FilterPopup
                                onFilter={handleFilter}
                                allDistricts={districts}
                                selectedDistricts={filteredDistricts}
                                selectedTeamLeads={filteredTeamLeads}
                                allTeamLeads={[...new Set(projects.map(p => p.tlName))].filter(Boolean)}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Projects;


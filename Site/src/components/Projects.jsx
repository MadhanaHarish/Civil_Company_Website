import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card.jsx";

const Projects = () => {
    const [showForm, setShowForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        type: "",
        tlName: "",
        description: "",
        pictures: ""
    });
    const [deleteData, setDeleteData] = useState({
        selectedProject: "",
        reEnterProjectName: ""
    });
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/projects');
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDeleteFormChange = (event) => {
        const { name, value } = event.target;
        setDeleteData({ ...deleteData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/projects/add', formData);
            setProjects([...projects, response.data.project]);
            setShowForm(false);
            setFormData({
                title: "",
                location: "",
                type: "",
                tlName: "",
                description: "",
                pictures: ""
            });
            setMessage("Project added successfully!");
        } catch (error) {
            setMessage(`Error adding project: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleDeleteFormSubmit = async (event) => {
        event.preventDefault();
        if (deleteData.selectedProject === deleteData.reEnterProjectName) {
            try {
                await axios.delete(`http://localhost:5000/api/projects/${deleteData.selectedProject}`);
                setProjects(projects.filter(project => project.title !== deleteData.selectedProject));
                setShowDeleteForm(false);
                setDeleteData({
                    selectedProject: "",
                    reEnterProjectName: ""
                });
                setMessage("Project deleted successfully!");
            } catch (error) {
                setMessage(`Error deleting project: ${error.response?.data?.message || error.message}`);
            }
        } else {
            setMessage("Project names do not match. Please try again.");
        }
    };

    const toggleForm = () => {
        setShowForm(!showForm);
        setMessage("");
    };

    const toggleDeleteForm = () => {
        setShowDeleteForm(!showDeleteForm);
        setMessage("");
    };

    return (
        <>
            <div className="mt-20">
                <div className="text-center">
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 relative">
                        <span className="w-full sm:w-auto relative">
                            <input
                                type="text"
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-12 pl-4 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                placeholder="Coimbatore..."
                            />
                            <button
                                className="absolute right-1 top-1 rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </span>
                        <div className="flex space-x-4">
                            <button
                                className="p-2.5 m-2 text-sm font-medium text-white bg-gray-700 rounded-lg border border-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                            >
                                Filters
                            </button>
                            <button
                                className="p-2.5 m-2 text-sm font-medium text-white bg-green-700 rounded-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                onClick={toggleForm}
                            >
                                {showForm ? "Hide Form" : "Add Project"}
                            </button>
                            <button
                                className="p-2.5 m-2 text-sm font-medium text-white bg-red-700 rounded-lg border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                onClick={toggleDeleteForm}
                            >
                                {showDeleteForm ? "Hide Delete Form" : "Delete Project"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {message && (
                <div className="mt-4 text-center">
                    <p className={`text-sm ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}>{message}</p>
                </div>
            )}
            {showForm && (
                <div className="mt-10 p-4 bg-white rounded-lg shadow-md mb-4">
                    <h2 className="text-xl font-bold mb-4">Add New Project</h2>
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Project Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleFormChange}
                                className="w-full border border-gray-300 p-2 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleFormChange}
                                className="w-full border border-gray-300 p-2 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Project Type</label>
                            <input
                                type="text"
                                name="type"
                                value={formData.type}
                                onChange={handleFormChange}
                                className="w-full border border-gray-300 p-2 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">TL Name</label>
                            <input
                                type="text"
                                name="tlName"
                                value={formData.tlName}
                                onChange={handleFormChange}
                                className="w-full border border-gray-300 p-2 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleFormChange}
                                className="w-full border border-gray-300 p-2 rounded"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Pictures URL</label>
                            <input
                                type="text"
                                name="pictures"
                                value={formData.pictures}
                                onChange={handleFormChange}
                                className="w-full border border-gray-300 p-2 rounded"
                            />
                        </div>
                        <button
                            type="submit"
                            className="p-2.5 m-2 text-sm font-medium text-white bg-green-700 rounded-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            )}
            {showDeleteForm && (
                <div className="mt-10 p-4 bg-white rounded-lg shadow-md mb-4">
                    <h2 className="text-xl font-bold mb-4">Delete Project</h2>
                    <form onSubmit={handleDeleteFormSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Select Project</label>
                            <select
                                name="selectedProject"
                                value={deleteData.selectedProject}
                                onChange={handleDeleteFormChange}
                                className="w-full border border-gray-300 p-2 rounded"
                            >
                                <option value="">Select a project</option>
                                {projects.map((project) => (
                                    <option key={project._id} value={project.title}>
                                        {project.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Re-enter Project Name</label>
                            <input
                                type="text"
                                name="reEnterProjectName"
                                value={deleteData.reEnterProjectName}
                                onChange={handleDeleteFormChange}
                                className="w-full border border-gray-300 p-2 rounded"
                            />
                        </div>
                        <button
                            type="submit"
                            className="p-2.5 m-2 text-sm font-medium text-white bg-red-700 rounded-lg border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300"
                        >
                            Delete
                        </button>
                    </form>
                </div>
            )}
            {!showForm && !showDeleteForm && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {projects.map((project, index) => (
                        <Card key={index} project={project} />
                    ))}
                </div>
            )}
        </>
    );
};

export default Projects;
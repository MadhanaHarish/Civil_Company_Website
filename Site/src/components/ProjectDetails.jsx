import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        type: "",
        tlName: "",
        status: "", // Added status field
        customerEmail: "",
    });

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/projects/${id}`);
                setProject(response.data);
                setFormData({
                    title: response.data.title,
                    description: response.data.description,
                    location: response.data.location,
                    type: response.data.type,
                    tlName: response.data.tlName,
                    status: response.data.status, // Added status field
                    customerEmail: response.data.customerEmail,
                });
            } catch (error) {
                console.error("Error fetching project details:", error);
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
            const response = await axios.put(`http://localhost:5000/api/projects/${id}`, formData);
            setProject(response.data.project); // Update the project state with the updated data
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating project:", error);
        }
    };

    if (!project) {
        return <div className="text-center text-xl font-semibold mt-20">Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center mt-20 p-6 w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
            {isEditing ? (
                <form onSubmit={handleUpdate} className="w-full">
                    <div className="mb-4">
                        <label className="block text-gray-700">Project Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Type</label>
                        <input
                            type="text"
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Team Leader</label>
                        <input
                            type="text"
                            name="tlName"
                            value={formData.tlName}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded"
                        >
                            <option value="">Select status</option>
                            <option value="Live">Live</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Customer Email</label>
                        <input
                            type="email"
                            name="customerEmail"
                            value={formData.customerEmail}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition"
                    >
                        Save Changes
                    </button>
                </form>
            ) : (
                <>
                    <img
                        src={project.pictures[0]}
                        alt="Project"
                        className="w-full h-64 object-cover rounded-lg mb-6"
                    />
                    <div className="w-full p-4">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{project.title}</h1>
                        <p className="text-gray-600 mb-4">{project.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <p className="bg-gray-100 p-3 rounded-lg"><strong>Location:</strong> {project.location}</p>
                            <p className="bg-gray-100 p-3 rounded-lg"><strong>Type:</strong> {project.type}</p>
                            <p className="bg-gray-100 p-3 rounded-lg"><strong>Team Leader:</strong> {project.tlName}</p>
                            <p className="bg-gray-100 p-3 rounded-lg"><strong>Status:</strong> {project.status}</p> {/* Added status field */}
                        </div>
                    </div>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition"
                    >
                        Update
                    </button>
                </>
            )}
        </div>
    );
};

export default ProjectDetails;


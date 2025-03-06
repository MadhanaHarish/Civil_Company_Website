import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/projects/${id}`);
                setProject(response.data);
            } catch (error) {
                console.error("Error fetching project details:", error);
            }
        };

        fetchProject();
    }, [id]);

    if (!project) {
        return <div className="text-center text-xl font-semibold mt-20">Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center mt-20 p-6 w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
            {/* Project Image */}
            <img
                src={/*project.pictures[0] ||*/ "https://png.pngtree.com/png-vector/20191113/ourmid/pngtree-link-chain-url-connection-link-abstract-circle-background-fl-png-image_1985250.jpg"}
                alt="Project"
                className="w-full h-64 object-cover rounded-lg mb-6"
            />

            {/* Project Details */}
            <div className="w-full p-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{project.title}</h1>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p className="bg-gray-100 p-3 rounded-lg"><strong>Location:</strong> {project.location}</p>
                    <p className="bg-gray-100 p-3 rounded-lg"><strong>Type:</strong> {project.type}</p>
                    <p className="bg-gray-100 p-3 rounded-lg"><strong>Team Leader:</strong> {project.tlName}</p>
                </div>
            </div>

            {/* Update Button */}
            <button
                className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
                Update
            </button>
        </div>
    );
};

export default ProjectDetails;

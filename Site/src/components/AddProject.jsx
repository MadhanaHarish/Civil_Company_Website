import React, { useState, useEffect } from "react";
import axios from "axios";

const districts = [
    "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kancheepuram",
    "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet",
    "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupattur", "Tiruppur",
    "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"
];

const AddProject = ({ handleFormSubmit, handleFormChange, formData }) => {
    const [teamLeaders, setTeamLeaders] = useState([]);

    useEffect(() => {
        const fetchTeamLeaders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/team-leaders');
                setTeamLeaders(response.data);
            } catch (error) {
                console.error("Error fetching team leaders:", error);
            }
        };

        fetchTeamLeaders();
    }, []);

    return (
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
                    <select
                        name="location"
                        value={formData.location}
                        onChange={handleFormChange}
                        className="w-full border border-gray-300 p-2 rounded"
                    >
                        <option value="">Select a district</option>
                        {districts.map((district) => (
                            <option key={district} value={district}>
                                {district}
                            </option>
                        ))}
                    </select>
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
                    <label className="block text-gray-700">Team Lead Name</label>
                    <input
                        type="text"
                        name="tlName"
                        value={formData.tlName}
                        onChange={handleFormChange}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Team Lead Email</label>
                    <input
                        type="email"
                        name="tlEmail"
                        value={formData.tlEmail}
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
                <div className="mb-4">
                    <label className="block text-gray-700">Customer Email</label>
                    <input
                        type="email"
                        name="customerEmail"
                        value={formData.customerEmail}
                        onChange={handleFormChange}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleFormChange}
                        className="w-full border border-gray-300 p-2 rounded"
                    >
                        <option value="">Select status</option>
                        <option value="Live">Live</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="p-2.5 m-2 text-sm font-medium text-white bg-green-700 rounded-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddProject;
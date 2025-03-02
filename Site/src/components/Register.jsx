import React, { useState } from "react";
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        role: "",
        contactInfo: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/users/register", formData);
            alert(response.data.message);
        } catch (error) {
            alert("Error registering user: " + error.response.data.error);
        }
    };

    return (
        <div className="mt-20 flex justify-center">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-4xl font-bold text-center mb-4">Register</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Role</label>
                        <select
                            name="role"
                            className="w-full border border-gray-300 p-2 rounded"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="Team Leader">Team Leader</option>
                            <option value="Customer">Customer</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Contact Information</label>
                        <input
                            type="tel"
                            name="contactInfo"
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="Enter your phone number"
                            value={formData.contactInfo}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-2 text-white bg-green-600 rounded hover:bg-green-700"
                    >
                        Register
                    </button>
                </form>
                <div className="text-center">
                    <p className="text-gray-700">
                        Already have an account? <a href="/login" className="text-blue-600 hover:underline">Click here to login</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        window.gapi.load('auth2', () => {
            window.gapi.auth2.init({
                client_id: '523788759239-j1lk4v9lmgsi465rkum83el82jjt43l8.apps.googleusercontent.com'
            });
        });
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/users/login", formData);
            alert(response.data.message);
            setIsLoggedIn(true);
            navigate("/");
        } catch (error) {
            alert("Error logging in: " + error.response.data.error);
        }
    };

    const handleGoogleSignIn = async () => {
        const auth2 = window.gapi.auth2.getAuthInstance();
        const googleUser = await auth2.signIn();
        const profile = googleUser.getBasicProfile();
        const email = profile.getEmail();

        try {
            const response = await axios.post("http://localhost:5000/api/users/google-login", { email });
            alert(response.data.message);
            setIsLoggedIn(true);
            navigate("/");
        } catch (error) {
            alert("Error logging in with Google: " + error.response.data.error);
        }
    };

    return (
        <div className="mt-20 flex justify-center">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-4xl font-bold text-center mb-4">Login</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            name="username"
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="Enter your username"
                            value={formData.username}
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
                    <button
                        type="submit"
                        className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                        Login
                    </button>
                </form>
                <div className="text-center">
                    <button
                        className="w-full p-2 text-white bg-red-600 rounded hover:bg-red-700"
                        onClick={handleGoogleSignIn}
                    >
                        Sign in with Google
                    </button>
                </div>
                <div className="text-center">
                    <p className="text-gray-700">
                        Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Click here to register</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
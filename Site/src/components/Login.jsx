import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const Login = ({ setIsLoggedIn, setLoggedInEmail, setLoggedInRole }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
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
        
        // Clear error when user starts typing
        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        try {
            const response = await axios.post("https://civil-company-website.onrender.com/api/users/login", formData);
            setIsLoggedIn(true);
            setLoggedInEmail(response.data.email);
            setLoggedInRole(response.data.role);
            navigate("/");
        } catch (error) {
            setError(error.response?.data?.error || "An error occurred during login");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError("");
        
        try {
            const auth2 = window.gapi.auth2.getAuthInstance();
            const googleUser = await auth2.signIn();
            const profile = googleUser.getBasicProfile();
            const email = profile.getEmail();

            const response = await axios.post("http://localhost:5000/api/users/google-login", {email});
            setIsLoggedIn(true);
            setLoggedInEmail(email);
            setLoggedInRole(response.data.role);
            navigate("/");
        } catch (error) {
            setError(error.response?.data?.error || "An error occurred during Google login");
        } finally {
            setLoading(false);
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const formControlVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: index => ({ 
            opacity: 1, 
            y: 0,
            transition: { 
                delay: 0.1 * index,
                duration: 0.5
            }
        })
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
            <motion.div 
                className="w-full max-w-md overflow-hidden"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-100">
                    <motion.div 
                        className="text-center mb-8"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-extrabold text-gray-900">Welcome back</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Sign in to your account to continue
                        </p>
                    </motion.div>

                    {error && (
                        <motion.div 
                            className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-200"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {error}
                        </motion.div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <motion.div 
                            className="space-y-1"
                            custom={1}
                            variants={formControlVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    name="username"
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm"
                                    placeholder="Enter your username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </motion.div>

                        <motion.div 
                            className="space-y-1"
                            custom={2}
                            variants={formControlVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            custom={3}
                            variants={formControlVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex items-center justify-between"
                        >
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                    Forgot password?
                                </a>
                            </div>
                        </motion.div>

                        <motion.div
                            custom={4}
                            variants={formControlVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.button
                                type="submit"
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={loading}
                            >
                                {loading ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : "Sign in"}
                            </motion.button>
                        </motion.div>
                    </form>

                    <motion.div 
                        className="mt-6"
                        custom={5}
                        variants={formControlVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <motion.button
                                type="button"
                                className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-200"
                                onClick={handleGoogleSignIn}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={loading}
                            >
                                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" width="24" height="24">
                                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                                        <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                                        <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                                        <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                                        <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                                    </g>
                                </svg>
                                Sign in with Google
                            </motion.button>
                        </div>
                    </motion.div>

                    <motion.div 
                        className="mt-6 text-center text-sm"
                        custom={6}
                        variants={formControlVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500 transition duration-200">
                                Create an account
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import AboutUs from './components/AboutUs';
import Projects from './components/Projects';
import MyProjects from './components/MyProjects';
import Login from './components/Login';
import Register from './components/Register';
import ProjectDetails from "./components/ProjectDetails.jsx";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInEmail, setLoggedInEmail] = useState("");
    const [loggedInRole, setLoggedInRole] = useState(""); // Add state for role

    return (
        <Router>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setLoggedInEmail={setLoggedInEmail} setLoggedInRole={setLoggedInRole}/>
            <div className="h-screen p-2">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/projects" element={<Projects loggedInRole={loggedInRole} isLoggedIn={isLoggedIn} />} />
                    <Route
                        path="/my-projects"
                        element={isLoggedIn ? <MyProjects loggedInEmail={loggedInEmail} loggedInRole={loggedInRole} /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/login"
                        element={<Login setIsLoggedIn={setIsLoggedIn} setLoggedInEmail={setLoggedInEmail} setLoggedInRole={setLoggedInRole} />}
                    />
                    <Route path="/register" element={<Register />} />
                    <Route path="/projects/:id" element={<ProjectDetails loggedInRole={loggedInRole}/>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
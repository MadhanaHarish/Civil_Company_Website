import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import AboutUs from './components/AboutUs';
import Projects from './components/Projects';
import MyProjects from './components/MyProjects';
import Login from './components/Login';

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="h-screen p-2">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/my-projects" element={<MyProjects />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
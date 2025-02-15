import React from 'react';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="home-page h-screen flex items-center justify-center">
            <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-4">Welcome to Civil Company Management</h1>
                <p className="text-xl">We provide the best services for managing your civil projects.</p>
            </div>
        </div>
    );
};

export default HomePage;
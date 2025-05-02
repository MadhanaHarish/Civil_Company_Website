import React from 'react';
import HeroSection from "./HeroSection.jsx";
import ServicesSection from "./ServicesSection.jsx";
import OurJourney from "./OurJourney.jsx";
import StatsSection from "./StatsSection.jsx";
import Footer from "./Footer.jsx";
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="home-page">
            <HeroSection />
            <ServicesSection />
            <div className="container mx-auto pt-16">
                <OurJourney/>
                <StatsSection />
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
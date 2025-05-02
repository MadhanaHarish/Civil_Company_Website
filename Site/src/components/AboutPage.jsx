import React from 'react';
import AboutUsSection from './AboutUsSection';
import StatsSection from './StatsSection';
import Footer from './Footer';

const AboutPage = () => {
  return (
    <div className="about-page pt-16">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-red-500 to-red-700 mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl">
            Learn about our journey, our values, and our commitment to excellence in construction.
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <AboutUsSection />
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* Team Section - Optional */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Leadership Team</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-red-500 to-red-700 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the experts behind Landmark Construction's success. Our leadership brings decades of industry experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "John Doe", position: "CEO & Founder", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" },
              { name: "Jane Smith", position: "Project Director", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80" },
              { name: "Robert Johnson", position: "Chief Architect", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" },
            ].map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-lg group">
                <div className="h-80 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                  <p className="text-red-500">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage; 
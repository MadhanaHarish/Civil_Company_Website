import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white pt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-red-500 mb-6">LANDMARK CONSTRUCTION</h3>
            <p className="text-gray-300">Copyright © 2025 Landmark Construction Company. All rights reserved.</p>
            <div className="flex items-start space-x-2 text-gray-300">
              <FaMapMarkerAlt className="mt-1 flex-shrink-0 text-red-500" />
              <p>Landmark Projects, No.55J, Dharapuram Road, Cheran Nagar, Vellakovil-638111, Kangayam(TK), Tirupur(DT).</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-red-500 mb-6">QUICK LINKS</h3>
            <ul className="space-y-3">
              <li className="transition-all duration-300 hover:translate-x-2">
                <Link to="/about" className="text-gray-300 hover:text-white hover:underline">Who We Are</Link>
              </li>
              <li className="transition-all duration-300 hover:translate-x-2">
                <Link to="/news" className="text-gray-300 hover:text-white hover:underline">News & Insights</Link>
              </li>
              <li className="transition-all duration-300 hover:translate-x-2">
                <Link to="/contact" className="text-gray-300 hover:text-white hover:underline">Contact</Link>
              </li>
              <li className="transition-all duration-300 hover:translate-x-2">
                <Link to="/transparency" className="text-gray-300 hover:text-white hover:underline">Transparency in Coverage</Link>
              </li>
              <li className="transition-all duration-300 hover:translate-x-2">
                <Link to="/privacy" className="text-gray-300 hover:text-white hover:underline">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-red-500 mb-6">SOCIAL</h3>
            <div className="flex space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-blue-700 transition-colors duration-300">
                <FaLinkedinIn className="text-white" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-pink-600 transition-colors duration-300">
                <FaInstagram className="text-white" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-blue-600 transition-colors duration-300">
                <FaFacebookF className="text-white" />
              </a>
            </div>
            <p className="text-gray-300 mt-4">Follow us on social media for the latest updates on our projects, industry insights, and company news.</p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-red-500 mb-6">CONTACT</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaPhoneAlt className="text-red-500" />
                <p className="text-gray-300">+91 98765 43210</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-red-500" />
                <p className="text-gray-300">info@landmarkconstructions.com</p>
              </div>
              <p className="text-gray-300 mt-2">National Presence</p>
              <p className="text-gray-300">Media Inquiries: media@landmarkconstructions.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400 text-sm">
          <p>© 2025 Landmark Construction. All rights reserved. Designed with excellence.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
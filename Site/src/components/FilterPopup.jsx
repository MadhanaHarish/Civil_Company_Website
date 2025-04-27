import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const districts = [
    "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode", "Vellore", "Thoothukudi", "Dindigul"
];

const FilterPopup = ({ onFilter, allDistricts, allTeamLeads, selectedDistricts = [], selectedTeamLeads = [] }) => {
    const [districts, setDistricts] = useState(selectedDistricts);
    const [teamLeads, setTeamLeads] = useState(selectedTeamLeads);
    const [activeTab, setActiveTab] = useState("location");

    // Initialize with props when component mounts or props change
    useEffect(() => {
        setDistricts(selectedDistricts);
        setTeamLeads(selectedTeamLeads);
    }, [selectedDistricts, selectedTeamLeads]);

    const handleDistrictChange = (event) => {
        const { value, checked } = event.target;
        setDistricts(prev =>
            checked 
                ? [...prev, value] 
                : prev.filter(district => district !== value)
        );
    };

    const handleTeamLeadChange = (event) => {
        const { value, checked } = event.target;
        setTeamLeads(prev =>
            checked 
                ? [...prev, value] 
                : prev.filter(lead => lead !== value)
        );
    };

    const handleApplyFilter = () => {
        onFilter(districts, teamLeads);
    };

    const handleClearFilters = () => {
        setDistricts([]);
        setTeamLeads([]);
    };

    const handleClose = () => {
        onFilter(districts, teamLeads);
    };

    return (
        <div className="max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Filter Projects</h2>
                <button 
                    onClick={handleClose}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="mb-6">
                <div className="flex border-b border-gray-200">
                    <button
                        className={`py-2 px-4 text-sm font-medium ${activeTab === 'location' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('location')}
                    >
                        Locations
                    </button>
                    <button
                        className={`py-2 px-4 text-sm font-medium ${activeTab === 'teamLead' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('teamLead')}
                    >
                        Team Leads
                    </button>
                </div>
            </div>

            {activeTab === 'location' && (
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-medium text-gray-700">Filter by Location</h3>
                        <span className="text-xs text-blue-600">{districts.length} selected</span>
                    </div>
                    
                    <div className="max-h-60 overflow-y-auto p-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {allDistricts.map(district => (
                                <label key={district} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                                    <input
                                        type="checkbox"
                                        value={district}
                                        checked={districts.includes(district)}
                                        onChange={handleDistrictChange}
                                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">{district}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'teamLead' && (
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-medium text-gray-700">Filter by Team Lead</h3>
                        <span className="text-xs text-blue-600">{teamLeads.length} selected</span>
                    </div>
                    
                    <div className="max-h-60 overflow-y-auto p-1">
                        <div className="grid grid-cols-1 gap-2">
                            {allTeamLeads && allTeamLeads.length > 0 ? (
                                allTeamLeads.map(lead => (
                                    <label key={lead} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                                        <input
                                            type="checkbox"
                                            value={lead}
                                            checked={teamLeads.includes(lead)}
                                            onChange={handleTeamLeadChange}
                                            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700">{lead}</span>
                                    </label>
                                ))
                            ) : (
                                <div className="text-sm text-gray-500 text-center py-4">
                                    No team leads available
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleApplyFilter}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors"
                >
                    Apply Filters
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleClearFilters}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 font-medium text-sm transition-colors"
                >
                    Clear All
                </motion.button>
            </div>
        </div>
    );
};

export default FilterPopup;
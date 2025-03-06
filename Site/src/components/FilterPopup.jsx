import React, { useState } from "react";

const districts = [
    "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode", "Vellore", "Thoothukudi", "Dindigul"
];

const FilterPopup = ({ onFilter }) => {
    const [selectedDistricts, setSelectedDistricts] = useState([]);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        setSelectedDistricts(prev =>
            checked ? [...prev, value] : prev.filter(district => district !== value)
        );
    };

    const handleApplyFilter = () => {
        onFilter(selectedDistricts);
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Filter by Location</h2>
                <div className="grid grid-cols-2 gap-4">
                    {districts.map(district => (
                        <label key={district} className="flex items-center">
                            <input
                                type="checkbox"
                                value={district}
                                onChange={handleCheckboxChange}
                                className="mr-2"
                            />
                            {district}
                        </label>
                    ))}
                </div>
                <button
                    onClick={handleApplyFilter}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Apply Filter
                </button>
            </div>
        </div>
    );
};

export default FilterPopup;
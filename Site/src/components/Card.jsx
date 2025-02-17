import React from "react";

const Card = () => {
    return (
        <div className="flex flex-row gap-2 h-30 p-2 bg-white w-full rounded-lg shadow-md transition transform hover:scale-102 hover:shadow-lg">
            <img src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="Card Image" className="h-full rounded-lg" />
            <div className="space-y-1">
                {[
                    ["Project Name", "First Project"],
                    ["Proj. Lead", "John Doe"],
                    ["Customer Satisfaction", "High"],
                ].map(([label, value], index) => (
                    <div key={index} className="grid grid-cols-2 gap-x-3">
                        <p className="text-gray-800 font-medium">{label}</p>
                        <p>: {value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Card;
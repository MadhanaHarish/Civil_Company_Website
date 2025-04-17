import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ isLoggedIn, project }) => {
    const  navigate = useNavigate();

    const  handleClick = () => {
        if (!isLoggedIn) {
            navigate("/login");
        } else {
            navigate(`/projects/${project._id}`);
        }
    }

    return (
        <div className="flex flex-row gap-2 h-30 p-2 bg-white w-full rounded-lg shadow-md transition transform hover:scale-102 hover:shadow-lg">
            <img src={project.pictures[0]}
                 className="w-50 h-full object-cover rounded"
            />
            <div className="space-y-1">
                {[
                    ["Project Name", project.title],
                    ["Proj. Lead", project.tlName],
                    ["Location", project.location],
                ].map(([label, value], index) => (
                    <div onClick={handleClick} key={index} className="grid grid-cols-2 gap-x-3">
                        <p className="text-gray-800 font-medium">{label}</p>
                        <p className="truncate">: {value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Card;

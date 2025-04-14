import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ project }) => {
    const  navigate = useNavigate();

    const  handleClick = () => {
        navigate(`/projects/${project._id}`);
    }

    return (
        <div className="flex flex-row gap-2 h-30 p-2 bg-white w-full rounded-lg shadow-md transition transform hover:scale-102 hover:shadow-lg">
            <img src={project.pictures[0]} />
            <div className="space-y-1">
                {[
                    ["Project Name", project.title],
                    ["Proj. Lead", project.tlName],
                    ["Status", project.status],
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

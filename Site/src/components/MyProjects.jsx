import React, {useState, useEffect} from "react";
import axios from "axios";
import Card from "./Card.jsx";
import FilterPopup from "./FilterPopup.jsx";

const MyProjects = ({ loggedInEmail, loggedInRole}) => {
    const [projects, setProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilterPopup, setShowFilterPopup] = useState(false);
    const [filteredDistricts, setFilteredDistricts] = useState([]);
    const [filteredTeamLeads, setFilteredTeamLeads] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/projects');
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchProjects();
    }, []);

    const handleFilter = (selectedDistricts, selectedTeamLeads) => {
        setFilteredDistricts(selectedDistricts || []);
        setFilteredTeamLeads(selectedTeamLeads || []);
        setShowFilterPopup(false);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredProjects = projects.filter(project =>
        project.customerEmail === loggedInEmail &&
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (filteredDistricts.length === 0 || filteredDistricts.includes(project.location)) &&
        (filteredTeamLeads.length === 0 || filteredTeamLeads.some(tl => tl === project.tlName))
    );

    const liveProjects = filteredProjects.filter(project => project.status === "Live");
    const completedProjects = filteredProjects.filter(project => project.status === "Completed");

    return (
        <>
            <div className="mt-20">
                <div className="text-center">
                    <div
                        className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 relative">
                        <span className="w-full sm:w-auto relative">
                            <input
                                type="text"
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-12 pl-4 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                            <button
                                className="absolute right-1 top-1 rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </span>
                        <button
                            className="p-2.5 m-2 text-sm font-medium text-white bg-gray-700 rounded-lg border border-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                            onClick={() => setShowFilterPopup(true)}
                        >
                            Filters
                        </button>
                    </div>
                </div>
            </div>
            <div className="space-y-8">
                <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Live Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {liveProjects.length > 0 ? (
                            liveProjects.map((project, index) => (
                                <Card key={index} project={project}/>
                            ))
                        ) : (
                            <div className="flex items-center justify-center w-full h-full">
                                <h1 className="text-center text-gray-500">No live projects found.</h1>
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Completed Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {completedProjects.length > 0 ? (
                            completedProjects.map((project, index) => (
                                <Card key={index} project={project}/>
                            ))
                        ) : (
                            <div className="flex items-center justify-center w-full h-full">
                                <h1 className="text-center text-gray-500">No completed projects found.</h1>
                            </div>
                        )}
                    </div>
                </div>
                {loggedInRole === "Team Leader" && (
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Assigned Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {completedProjects.length > 0 ? (
                                completedProjects.map((project, index) => (
                                    <Card key={index} project={project}/>
                                ))
                            ) : (
                                <div className="flex items-center justify-center w-full h-full">
                                    <h1 className="text-center text-gray-500">No assigned projects found.</h1>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            {showFilterPopup && (
                <FilterPopup
                    onFilter={handleFilter}
                    allDistricts={projects.map(project => project.location)}
                    allTeamLeads={projects.map(project => project.tlName)}
                />
            )}
        </>
    );
};

export default MyProjects;
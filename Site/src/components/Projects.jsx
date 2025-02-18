import React, { useState } from "react";
import Card from "./Card.jsx";

const Projects = () => {
    const [showForm, setShowForm] = useState(false);
    const [sections, setSections] = useState([{ heading: "", description: "" }]);

    const handleAddSection = () => {
        setSections([...sections, { heading: "", description: "" }]);
    };

    const handleInputChange = (index, event) => {
        const values = [...sections];
        values[index][event.target.name] = event.target.value;
        setSections(values);
    };

    return (
        <>
            <div className="mt-20">
                <div className="text-center">
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 relative">
                        <span className="w-full sm:w-auto relative">
                            <input
                                type="text"
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-12 pl-4 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                placeholder="Coimbatore..."
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
                        <div className="flex space-x-4">
                            <button
                                className="p-2.5 m-2 text-sm font-medium text-white bg-gray-700 rounded-lg border border-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                            >
                                Filters
                            </button>
                            <button
                                className="p-2.5 m-2 text-sm font-medium text-white bg-green-700 rounded-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                onClick={() => setShowForm(true)}
                            >
                                Add Project
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showForm && (
                <div className="mt-10 p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Add New Project</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700">Project Title</label>
                            <input type="text" className="w-full border border-gray-300 p-2 rounded" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Location</label>
                            <input type="text" className="w-full border border-gray-300 p-2 rounded" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Project Type</label>
                            <input type="text" className="w-full border border-gray-300 p-2 rounded" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Description</label>
                            <textarea className="w-full border border-gray-300 p-2 rounded"></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Pictures</label>
                            <input type="file" className="w-full border border-gray-300 p-2 rounded" multiple />
                        </div>
                        {sections.map((section, index) => (
                            <div key={index} className="mb-4">
                                <label className="block text-gray-700">Section {index + 1}</label>
                                <input
                                    type="text"
                                    name="heading"
                                    value={section.heading}
                                    onChange={(event) => handleInputChange(index, event)}
                                    className="w-full border border-gray-300 p-2 rounded mb-2"
                                    placeholder="Heading"
                                />
                                <textarea
                                    name="description"
                                    value={section.description}
                                    onChange={(event) => handleInputChange(index, event)}
                                    className="w-full border border-gray-300 p-2 rounded"
                                    placeholder="Description"
                                ></textarea>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddSection}
                            className="p-2.5 m-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                        >
                            Add Section
                        </button>
                        <button
                            type="submit"
                            className="p-2.5 m-2 text-sm font-medium text-white bg-green-700 rounded-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {[...Array(10)].map((_, index) => (
                    <Card key={index} />
                ))}
            </div>
        </>
    );
};

export default Projects;
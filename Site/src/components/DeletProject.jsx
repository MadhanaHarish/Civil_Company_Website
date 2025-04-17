import React from "react";

const DeletProject = ({ handleDeleteFormSubmit, handleDeleteFormChange, deleteData, projects }) => {
    return (
        <div className="mt-10 p-4 bg-white rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-bold mb-4">Delete Project</h2>
            <form onSubmit={handleDeleteFormSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Select Project</label>
                    <select
                        name="selectedProject"
                        value={deleteData.selectedProject}
                        onChange={handleDeleteFormChange}
                        className="w-full border border-gray-300 p-2 rounded"
                    >
                        <option value="">Select a project</option>
                        {projects.map((project) => (
                            <option key={project._id} value={project.title}>
                                {project.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Re-enter Project Name</label>
                    <input
                        type="text"
                        name="reEnterProjectName"
                        value={deleteData.reEnterProjectName}
                        onChange={handleDeleteFormChange}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="p-2.5 m-2 text-sm font-medium text-white bg-red-700 rounded-lg border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300"
                >
                    Delete
                </button>
            </form>
        </div>
    )
}

export default DeletProject;
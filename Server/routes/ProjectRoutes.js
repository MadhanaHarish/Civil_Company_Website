const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

// Create a new project
router.post('/add', async (req, res) => {
    const { title, location, type, tlName, tlEmail, description, pictures, status, customerEmail } = req.body;

    if (!title || !location || !type || !tlName || !tlEmail || !description || !pictures || !status || !customerEmail) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newProject = new Project({ title, location, type, tlName, tlEmail, description, pictures, status, customerEmail });
        await newProject.save();
        res.status(201).json({ message: 'Project added successfully', project: newProject });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Get all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a project by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, location, type, tlName, tlEmail, description, pictures, status, customerEmail } = req.body;

    try {
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { title, location, type, tlName, tlEmail, description, pictures, status, customerEmail },
            { new: true, runValidators: true } // Return the updated document and validate the fields
        );
        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:title', async (req, res) => {
    const { title } = req.params;

    try {
        const project = await Project.findOneAndDelete({ title });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;


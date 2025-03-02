const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    tlName: { type: String, required: true },
    description: { type: String, required: true },
    pictures: { type: [String], required: true }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    tlName: { type: String, required: true },
    tlEmail: { type: String, required: true }, // New field for team lead email
    description: { type: String, required: true },
    pictures: { type: [String], required: true },
    status: { type: String, required: true, enum: ['Live', 'Completed'] },
    customerEmail: { type: String, required: true }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    const { fullName, email, password, role, contactInfo } = req.body;

    console.log('Received registration request:', req.body);

    try {
        const newUser = new User({ fullName, email, password, role, contactInfo });
        await newUser.save();
        console.log('User registered successfully');
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(400).json({ error: error.message });
    }
});

// Login a user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    console.log('Received login request:', req.body);

    try {
        const user = await User.findOne({ email: username, password });
        if (user) {
            console.log('User logged in successfully');
            res.status(200).json({
                message: 'User logged in successfully',
                email: user.email,
                role: user.role // Include the role in the response
            });
        } else {
            res.status(400).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/google-login', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user) {
            res.status(200).json({ message: 'User logged in successfully' });
        } else {
            res.status(400).json({ error: 'No user found with this email' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/team-leaders', async (req, res) => {
    try {
        const teamLeaders = await User.find({ role: 'Team Leader' }, 'fullName email');
        res.status(200).json(teamLeaders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
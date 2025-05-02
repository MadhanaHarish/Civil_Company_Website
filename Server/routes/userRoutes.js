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
            res.status(200).json({ 
                message: 'User logged in successfully',
                email: user.email,
                role: user.role
            });
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

// Get user profile by email
router.get('/profile', async (req, res) => {
    try {
        const { email } = req.query;
        
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }
        
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Return user data without password
        const userData = {
            fullName: user.fullName,
            email: user.email,
            contactInfo: user.contactInfo,
            role: user.role
        };
        
        res.status(200).json(userData);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: error.message });
    }
});

// Update user profile
router.post('/update-profile', async (req, res) => {
    try {
        const { email, fullName, contactInfo } = req.body;
        
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }
        
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Update user fields
        user.fullName = fullName;
        user.contactInfo = contactInfo;
        
        await user.save();
        
        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: error.message });
    }
});

// Change user password
router.post('/change-password', async (req, res) => {
    try {
        const { email, currentPassword, newPassword } = req.body;
        
        if (!email || !currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Email, current password, and new password are required' });
        }
        
        // Find user and verify current password
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Check if current password matches
        if (user.password !== currentPassword) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }
        
        // Update password
        user.password = newPassword;
        await user.save();
        
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
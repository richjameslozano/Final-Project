const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define User Schema and Model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    mobileNumber: { type: String, required: true }
    // Removed agreeToTerms and receiveNewsletter
});

// Ensure the model name matches your collection name
const User = mongoose.model('accounts', userSchema); // The model name matches your MongoDB collection

const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
    const { username, password, firstName, lastName, email, mobileNumber } = req.body;

    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword, // Use the hashed password
            firstName,
            lastName,
            email,
            mobileNumber
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
        res.status(201).json(newUser);

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});


module.exports = router;

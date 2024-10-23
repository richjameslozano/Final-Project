const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
// const Movie = require('./models/Movie');

const app = express();
const PORT = process.env.PORT || 8020;
app.use('/images', express.static('public/images'));
// MongoDB connection
mongoose.connect('mongodb://localhost:27017/onepixel', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));
 
// Middleware
app.use(cors());
app.use(bodyParser.json());
 
// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Storing password in plain text (not recommended)
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: String, required: true }
});
// Movie Schema
const modelSchema = new mongoose.Schema({
    Name:  { type: String},
    runTime:  { type: String},
    genre:  { type: String},
    price:  { type: String},
    time:  { type: String},
    place: { type: String},
    date: { type: String},
    image: { type: String }
});
//Concert 
const featuredShowsSchemas = new mongoose.Schema({
    Name:  { type: String},
    runTime:  { type: String},
    genre:  { type: String},
    price:  { type: String},
    time:  { type: String},
    place: { type: String},
    date: { type: String},
    image: { type: String }
});

 

// User model
const User = mongoose.model('accounts', userSchema);

//Movies model
const Movie = mongoose.model('movies', modelSchema);

//Featured Shows model
const FeaturedShows = mongoose.model('movies', modelSchema);

 //FOR PICTURE RETRIEVE
app.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ message: 'Error fetching movies' });
    }
});
//FEATURED SHOWS
app.get('/featuredshows', async (req, res) => {
    try {
        const featuredshows = await Movie.find();
        res.status(200).json(featuredshows);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ message: 'Error fetching movies' });
    }
});
// API route for login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
 
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
       
        }
 
        // Check plain-text password (not secure)
        if (password !== user.password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
 
        res.json({ message: 'Login successful' });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});
 
// API route for signup
app.post('/signup', async (req, res) => {
    console.log('Request Body:', req.body); // Log the incoming data
    const { username, password, firstName, lastName, email, mobileNumber } = req.body;
 
    // Input validation
    if (!username || !password || !firstName || !lastName || !email || !mobileNumber) {
        return res.status(400).json({ message: 'All fields are required' });
    }
 
    try {
        // Check for existing user by username or email
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists, please choose a different one' });
        }
 
        // Create new user with plain-text password
        const newUser = new User({ username, password, firstName, lastName, email, mobileNumber });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
});
 
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
 
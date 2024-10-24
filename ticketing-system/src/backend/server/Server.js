const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8025;
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
//Featured Show 
const featuredShowsSchemas = new mongoose.Schema({
    name:  { type: String},
    runTime:  { type: String},
    genre:  { type: String},
    price:  { type: String},
    time:  { type: String},
    place: { type: String},
    date: { type: String},
    image: { type: String }
});

//Concerts
const featureConcert = new mongoose.Schema({
    name:  { type: String},
    price:  { type: String},
    time:  { type: String},
    place: { type: String},
    date: { type: String},
    image: { type: String }
});

const featureSport = new mongoose.Schema({
    name:  { type: String},
    price:  { type: String},
    time:  { type: String},
    place: { type: String},
    date: { type: String},
    image: { type: String }
});

const featureTour = new mongoose.Schema({
    name:  { type: String},
    price:  { type: String},
    time:  { type: String},
    place: { type: String},
    date: { type: String},
    image: { type: String }
});
 
//Concert model
const Concert = mongoose.model('concerts', featureConcert);

//Sports model
const Sports = mongoose.model('sports', featureSport);

// User model
const User = mongoose.model('accounts', userSchema);

//Movies model
const Movie = mongoose.model('movies', modelSchema);

//Movies model
const Tours = mongoose.model('tours', featureTour);

//Featured Shows model  
const FeaturedShows = mongoose.model('featuredshows', featuredShowsSchemas);

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

 //FOR PICTURE TOURS RETRIEVE
 app.get('/tours', async (req, res) => {
    try {
        const tours = await Tours.find();
        res.status(200).json(tours);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ message: 'Error fetching movies' });
    }
});

 //FOR PICTURE SPORTS RETRIEVE
 app.get('/sports', async (req, res) => {
    try {
        const sport = await Sports.find();
        res.status(200).json(sport);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ message: 'Error fetching movies' });
    }
});

 //FOR PICTURE CONCERT RETRIEVE
 app.get('/concerts', async (req, res) => {
    try {
        const concert = await Concert.find();
        res.status(200).json(concert);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ message: 'Error fetching movies' });
    }
});

//RETRIEVE USER INFORMATION
// app.get('/profile', async (req, res)=>{
//     try {
//         const userInfo = await User.find();
//         res.status(200).json(userInfo);
//     } catch (error) {
//         console.error('Error fetching movies:', error);
//         res.status(500).json({ message: 'Error fetching User Information' });
//     }
// })


//FEATURED SHOWS
app.get('/featuredshows', async (req, res) => {
    try {
        const featuredshows = await FeaturedShows.find();
        res.status(200).json(featuredshows);
    } catch (error) {
        console.error('Error fetching shows:', error);
        res.status(500).json({ message: 'Error fetching movies' });
    }
});

// API route for login
// Update your /login route
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

        // Return the user details (excluding the password)
        res.json({
            message: 'Login successful',
            id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
        });
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

// API route to get user data
// API route to update user data
app.put('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const { username, firstName, lastName, email, password } = req.body;

        // Validate if the userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // Update user information in the database
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { username, firstName, lastName, email, password }, // Fields to update
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        console.error('Error updating user data:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// API route to get user data by ID
app.get('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        // Validate if the userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Exclude password from the response
        const { password, ...userDetails } = user._doc;
        res.status(200).json(userDetails);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
 
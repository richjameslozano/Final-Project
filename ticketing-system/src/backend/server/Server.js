// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const getRoutes = require('../routes/Routes'); // Adjust the path if necessary

// const app = express();
// app.use('/signup', getRoutes);
// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors({
//     origin: 'http://localhost:3000',
// }));

// // Connect to MongoDB (make sure to specify your database)
// mongoose.connect('mongodb://localhost:27017/', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((error) => {
//     console.error("MongoDB connection error:", error);
//   });


// // Start the server
// app.listen(8015, () => {
//     console.log("Server is up and running on port 8011");
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8017;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/onepixel', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// User Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    mobileNumber: String,
});

const User = mongoose.model('accounts', userSchema);


// API route for registration
app.post('/signup', async (req, res) => {
    const { username, password, firstName, lastName, email, mobileNumber } = req.body;

    try {
        const newUser = new User({ username, password, firstName, lastName, email, mobileNumber });
        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).send('Error registering user');
    }
});

app.get('/signup', async (req, res) => {
    try {
        const officers = await User.find();
        res.json(officers);
    } catch (err) {
        console.error('Error fetching:', err);
        res.status(500).json({ message: 'Failed to fetch' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

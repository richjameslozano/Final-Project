
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
 
const app = express();
const PORT = process.env.PORT || 8031;
app.use('/images', express.static('public/images'));
 
// MongoDB connection
mongoose.connect('mongodb://localhost:27017/onepixel', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));
 
// Middleware
app.use(cors());
app.use(bodyParser.json());
 
//--------------------------------SCHEMAS----------------------------------------------//

// ticket Schema
const ticketSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: String, required: true },
    place: { type: String, required: true },
    time: { type: String, required: true },
    price: { type: Number, required: true },
    // Include other relevant fields as needed
});

// Define user schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Storing password in plain text (not recommended)
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: String, required: true },
    ticket: [ticketSchema] // Array of ticket objects
});

// Movie Schema
const modelSchema = new mongoose.Schema({
    name:  { type: String},
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
//Sports
const featureSport = new mongoose.Schema({
    name:  { type: String},
    price:  { type: String},
    time:  { type: String},
    place: { type: String},
    date: { type: String},
    image: { type: String }
});

//Tour 
const featureTour = new mongoose.Schema({
    name:  { type: String},
    price:  { type: String},
    time:  { type: String},
    place: { type: String},
    date: { type: String},
    image: { type: String }
});

//cart
const cartModel = new mongoose.Schema({
    name:  { type: String},
    runTime:  { type: String},
    genre:  { type: String},
    price: { type: String},
    time: { type: String},
    place: { type: String },
    date: { type: String },
    image: { type: String }
});

const allEventsSchema = new mongoose.Schema({
    type: { type: String, required: true }, // e.g., 'movie', 'concert', 'sport', 'tour', 'show'
    name: { type: String, required: true },
    runTime: { type: String }, // Optional for events without duration (e.g., concerts)
    genre: { type: String }, // Optional for events like sports
    price: { type: String, required: true },
    time: { type: String, required: true },
    place: { type: String, required: true },
    date: { type: String, required: true },
    image: { type: String }, // Optional if no image available
    description: { type: String } // Additional field for more event details
});

// All Events Model
const AllEvents = mongoose.model('allevents', allEventsSchema);


//--------------------------------MODELS----------------------------------------------//

//Concert Model
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

//Cart Model
const cartItems = mongoose.model('carts', cartModel);

//////////////////////////////////////////////////////////////////
const updateUser = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(user => res.json(user))
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  }
  
  const getUser = (req, res) => {
    User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  }
  app.put('/updateUser/:id', updateUser)
  app.get('/getUser/:id', getUser)
 //////////////////////////////////////////////////////////////////////////////

 //Retrieving Pictures of Movies
app.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ message: 'Error fetching movies' });
    }
});

app.get('/allevents', async (req, res) => {
    try {
        const movies = await AllEvents.find();
        res.status(200).json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ message: 'Error fetching movies' });
    }
});
 
 // Retieving Tours Pictures 
 app.get('/tours', async (req, res) => {
    try {
        const tours = await Tours.find();
        res.status(200).json(tours);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ message: 'Error fetching movies' });
    }
});
 
 //Retrieving Sports Pictures
 app.get('/sports', async (req, res) => {
    try {
        const sport = await Sports.find();
        res.status(200).json(sport);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ message: 'Error fetching movies' });
    }
});
 
 //Retieving Concerts Pictures
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
 
//Fetching Features Shows
app.get('/featuredshows', async (req, res) => {
    try {
        const featuredshows = await FeaturedShows.find();
        res.status(200).json(featuredshows);
    } catch (error) {
        console.error('Error fetching shows:', error);
        res.status(500).json({ message: 'Error fetching movies' });
    }
});
 
//Fetching ALl Shows
app.get('/AllShows', async (req, res) => {
    try {
        // Fetch data from each collection
        
        const concerts = await Concert.find();
        const movies = await Movie.find();
        const sports = await Sports.find();
        const tours = await Tours.find();
        
        // Combine all the shows into a single array
        const allShows = [...movies, ...concerts, ...sports, ...tours];

        res.status(200).json(allShows);
    } catch (error) {
        console.error('Error fetching all shows:', error);
        res.status(500).json({ message: 'Error fetching all shows' });
    }
});

 // Login Function  //Getting Profile Infos
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
        
        // Return the user details including the password
        res.json({
            message: 'Login successful',
            id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password // Include password in the response
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
 
//  Putting New User Changes 
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


// Getting New User Changes
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
        const {...userDetails } = user._doc;
        res.status(200).json(userDetails);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

//Deleting Items in the Cart
app.delete('/cart/:id', async (req, res) => {
    try {
      const deletedItem = await cartItems.findByIdAndDelete(req.params.id); // Use req.params.id
      if (!deletedItem) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.status(200).json({ message: 'Item deleted successfully' });
    } catch (err) {
      console.error('Error deleting item:', err);
      res.status(500).json({ message: 'Failed to delete item' });
    }
  });

  // Searching Function
app.get('/search', async (req, res) => {
    const { query } = req.query;

    try {
        const results = await Movie.find({
            $or: [
                { Name: { $regex: query, $options: 'i' } },
                { genre: { $regex: query, $options: 'i' } }
            ]
        });

        res.status(200).json(results);
    } catch (error) {
        console.error('Error searching movies:', error);
        res.status(500).json({ message: 'Error searching movies' });
    }
});
  //pass data to Cart
  // to be modified
  app.post('/cart', async (req, res) => {
    try {
        const { name, runTime, genre, price, time, place, date, image } = req.body;
        
        // Create a new cart item based on the request data
        const newCartItem = new cartItems({
            name,
            runTime,
            genre,
            price,
            time,
            place,
            date,
            image
        });

        // Save the cart item to the database
        await newCartItem.save();

        res.status(201).json({ message: 'Item added to cart', item: newCartItem });
    } catch (error) {
        console.error('Failed to add item to cart:', error);
        res.status(500).json({ message: 'Failed to add item to cart', error });
    }
});
//getting data cart
app.get('/cart', async (req, res) => {
    try {
        const cartlist = await cartItems.find();
        res.status(200).json(cartlist);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ message: 'Error fetching movies' });
    }
});

//-----------------------------------------------------------------------------------//



// Get current user data by ID
app.get('/currentUser/:id', async (req, res) => {
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
        console.error('Error fetching current user data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

//FOR CART WITH ID --- GUMAWA AKO BAGONG COLLECTION, NAME: ALLEVENTS
app.post('/user/:userId/add-ticket/:concertId', async (req, res) => {
    const { userId, concertId } = req.params;

    try {
        // Step 1: Find the concert by its ID
        const concert = await AllEvents.findById(concertId);
        if (!concert) {
            return res.status(404).json({ message: 'Concert not found' });
        }


        // Step 2: Find the user and push the concert into their 'ticket' array
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $push: { ticket: concert } }, // Push concert into user's ticket array
            { new: true } // Return the updated user document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Concert added to tickets', user: updatedUser });
    } catch (error) {
        console.error('Error adding ticket to user:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


// Delete a ticket from the user's cart
// Not Working yet
app.delete('/user/:userId/remove-ticket/:concertId', async (req, res) => {
    const { userId, concertId } = req.params;

    try {
        console.log('Delete request:', { userId, concertId }); // Debugging: log request parameters

        // Validate if the userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // Validate if the concertId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(concertId)) {
            return res.status(400).json({ message: 'Invalid concert ID' });
        }

        // Step 1: Find the user by ID and remove the concert from their 'ticket' array
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { ticket: { _id: concertId } } }, // Use $pull to remove the concert
            { new: true } // Return the updated user document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('Updated User:', updatedUser); // Debugging: log updated user
        res.status(200).json({ message: 'Concert removed from tickets', user: updatedUser });
    } catch (error) {
        console.error('Error removing ticket from user:', error);
        res.status(500).json({ error: 'Server error' });
    }
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


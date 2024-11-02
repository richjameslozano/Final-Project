const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
 
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
 
// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: String, required: true },
    ticket: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },
        quantity: { type: Number, required: true, default: 1},
      },
    ],
    purchased:[
               {ticketId: {type:mongoose.Schema.Types.ObjectId, ref: 'Ticket'},
               orderId: {type:String,required: true},
               eventname: {type:String,required: true},
               eventdate: {type:String,required: true},
               eventtime: {type:String,required: true}, //time of show
               venue: {type:String,required: true}, //venue of show
               genre: {type:String,required: true},
               mop: {type:String,required: true}, //mode of payment
               date: {type:String,required: true}, //try to get real time date and time
               time:{type:String,required: true},   //try to get real time date and time
               price:{type:String,required: true},  
               quantity:{type:Number,required: true},
              }]
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
 

//--------------------------------MODELS----------------------------------------------//
// All Events Model
const AllEvents = mongoose.model('allevents', allEventsSchema);
 
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

//transfering cart item to purchased:

// Transfer tickets to purchased array and empty the ticket array
app.post('/user/:userId/purchase', async (req, res) => {
    const { userId } = req.params;

    try {
        // Find the user by their ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Iterate through each ticket and prepare the purchased details
        const purchasedTickets = user.ticket.map(ticket => ({
            ticketId: ticket._id,
            orderId: `ORD-${new Date().getTime()}`, // Generating a unique order ID
            eventname: ticket.name ||'Unknown Event name',
            eventdate: ticket.eventdate || '2024-01-01', // Use ticket details if available, otherwise set default
            eventtime: ticket.time || '00:00', // Set default time if not provided
            venue: ticket.place || 'Unknown Venue',
            genre: ticket.genre ||'Unknown Genre',
            mop: 'Credit Card', // Example mode of payment; you might fetch this from req.body
            date: new Date().toISOString().split('T')[0], // Current date
            time: new Date().toISOString().split('T')[1].split('.')[0], // Current time
            price: ticket.price || '0.00',
            quantity: ticket.quantity || 1
        }));

        // Update the user document to move tickets to purchased
        user.purchased.push(...purchasedTickets); // Add all tickets to purchased array
        user.ticket = []; // Clear the ticket array after transferring

        await user.save(); // Save the updated user document

        res.status(200).json({ message: 'Tickets transferred to purchased successfully', purchasedTickets });
    } catch (error) {
        console.error('Error transferring tickets to purchased:', error);
        res.status(500).json({ message: 'Failed to transfer tickets' });
    }
});

















 
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

        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Return the user details without the password
        res.json({
            message: 'Login successful',
            id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            // No password in the response
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});


  // Add bcrypt

app.post('/signup', async (req, res) => {
    const { username, password, firstName, lastName, email, mobileNumber } = req.body;

    if (!username || !password || !firstName || !lastName || !email || !mobileNumber) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists, please choose a different one' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user with hashed password
        const newUser = new User({ username, password: hashedPassword, firstName, lastName, email, mobileNumber });
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
});


// Putting New User Changes
app.put('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const { username, firstName, lastName, email, password } = req.body;

        // Validate if the userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // Find the user first
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user information in the database
        user.username = username;
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;

        // You can choose to update the password if provided or leave it as is
        if (password) {
            user.password = password; // Update only if password is provided
        }

        const updatedUser = await user.save(); // Save the updated user document

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

// Verifying User Password
app.post('/user/:id/verify-password', async (req, res) => {
    const userId = req.params.id;
    const { password } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the entered password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.status(200).json({ message: 'Password verified' });
    } catch (error) {
        console.error('Error verifying password:', error);
        res.status(500).json({ message: 'Error verifying password' });
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
    const { query } = req.query; // Get the query from the request
    console.log('Received query:', query); // Log the received query

    try {
        // Use regex to make the search case-insensitive
        const regex = new RegExp(query, 'i');
        const results = await AllEvents.find({ name: regex }); // Replace 'name' with the field you want to search against
        console.log('Search results:', results); // Log the results being sent back
        res.status(200).json(results);
    } catch (error) {
        console.error('Error searching events:', error);
        res.status(500).json({ message: 'Error searching events' });
    }
});



  //pass data to Cart
  // to be modified
//   app.post('/cart', async (req, res) => {
//     try {
//         const { name, runTime, genre, price, time, place, date, image } = req.body;
       
//         // Create a new cart item based on the request data
//         const newCartItem = new cartItems({
//             name,
//             runTime,
//             genre,
//             price,
//             time,
//             place,
//             date,
//             image
//         });
 
//         // Save the cart item to the database
//         await newCartItem.save();
 
//         res.status(201).json({ message: 'Item added to cart', item: newCartItem });
//     } catch (error) {
//         console.error('Failed to add item to cart:', error);
//         res.status(500).json({ message: 'Failed to add item to cart', error });
//     }
// });
// //getting data cart
// app.get('/cart', async (req, res) => {
//     try {
//         const cartlist = await cartItems.find();
//         res.status(200).json(cartlist);
//     } catch (error) {
//         console.error('Error fetching movies:', error);
//         res.status(500).json({ message: 'Error fetching movies' });
//     }
// });
 
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
// app.post('/user/:userId/add-ticket/:concertId', async (req, res) => {
//     const { userId, concertId } = req.params;
 
//     try {
//         // Step 1: Find the concert by its ID
//         const concert = await AllEvents.findById(concertId);
//         if (!concert) {
//             return res.status(404).json({ message: 'Concert not found' });
//         }
 
 
//         // Step 2: Find the user and push the concert into their 'ticket' array
//         const updatedUser = await User.findByIdAndUpdate(
//             userId,
//             { $push: { ticket: concert } }, // Push concert into user's ticket array
//             { new: true } // Return the updated user document
//         );
 
//         if (!updatedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }
 
//         res.status(200).json({ message: 'Concert added to tickets', user: updatedUser });
//     } catch (error) {
//         console.error('Error adding ticket to user:', error);
//         res.status(500).json({ error: 'Server error' });
//     }
// });

    app.post('/user/:userId/add-ticket/:eventId', async (req, res) => {
        const { userId, eventId } = req.params;
        const { quantity } = req.body;
    
        try {
        // Retrieve the event/movie data based on eventId
        const event = await AllEvents.findById(eventId);
        if (!event) return res.status(404).json({ message: 'Event not found' });
    
        // Construct the ticket object to include quantity
        const ticketWithQuantity = { ...event.toObject(), quantity };
    
        // Find the user and add the ticket to their array
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
    
        // Push the ticket with quantity into the user's tickets
        user.ticket.push(ticketWithQuantity);
        await user.save();
    
        res.status(200).json(ticketWithQuantity);
        } catch (error) {
        console.error('Error adding ticket:', error);
        res.status(500).json({ message: 'Failed to add ticket' });
        }
    });

    app.put('/user/:userId/update-ticket/:eventId', async (req, res) => {
        const { userId, eventId } = req.params;
        const { quantity } = req.body;
    
        try {
            // Find the user by userId
            const user = await User.findById(userId);
            if (!user) return res.status(404).json({ message: 'User not found' });
    
            // Find the ticket in the user's tickets
            const ticketIndex = user.ticket.findIndex(ticket => ticket._id.toString() === eventId);
            if (ticketIndex === -1) return res.status(404).json({ message: 'Ticket not found' });
    
            // Update the quantity
            user.ticket[ticketIndex].quantity = quantity;
            
            await user.save();
            
            res.status(200).json(user.ticket[ticketIndex]); // Send back the updated ticket
        } catch (error) {
            console.error('Error updating ticket:', error);
            res.status(500).json({ message: 'Failed to update ticket' });
        }
    });
    

// Delete ticket from user's cart
app.delete('/user/:userId/remove-ticket/:ticketId', async (req, res) => {
    const { userId, ticketId } = req.params;

    console.log(`Deleting ticket for User ID: ${userId}, Ticket ID: ${ticketId}`); // Log the IDs being used

    try {
        // Validate ObjectId formats
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(ticketId)) {
            return res.status(400).json({ message: 'Invalid user or ticket ID format' });
        }

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log("User's current tickets:", user.ticket); // Log current tickets

        // Find the ticket within the user's ticket array
        const ticketIndex = user.ticket.findIndex(ticket => ticket._id.toString() === ticketId);
        if (ticketIndex === -1) {
            return res.status(404).json({ message: 'Ticket not found in user cart' });
        }

        // Remove the ticket from the array
        user.ticket.splice(ticketIndex, 1);
        await user.save();

        res.status(200).json({ message: 'Ticket removed from user cart', user });
    } catch (error) {
        console.error('Error removing ticket:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Assuming you are using Express
app.delete('/user/:userId/clear-cart', async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Find the user and clear the ticket array
      await User.findByIdAndUpdate(userId, { $set: { ticket: [] } });
  
      res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
      console.error('Error clearing cart:', error);
      res.status(500).json({ message: 'Failed to clear cart' });
    }
  });
  

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
 
 
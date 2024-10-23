const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    runTime: { type: String, required: true },
    genre: { type: String, required: true },
    price: { type: String, required: true },
    time: { type: String, required: true },
    place: { type: String, required: true },
    date: { type: String, required: true },
    image: { type: String, required: true }
});

const Movie = mongoose.model("movies", movieSchema);

module.exports = Movie;
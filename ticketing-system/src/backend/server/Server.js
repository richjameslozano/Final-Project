const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const userRoutes = require('./routes/userRoutes');

// const { faker } = require('@faker-js/faker');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

mongoose.connect("mongodb://localhost:27017/")

// app.use('/api', userRoutes);

app.listen(8012, () => {
    console.log("Server is up and running");
});
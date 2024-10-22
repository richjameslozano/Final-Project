const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const getRoutes = require('../routes/Routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

mongoose.connect("mongodb://localhost:27017/")

app.use('/onepixel', getRoutes);

app.listen(8000, () => {
    console.log("Server is up and running");
});

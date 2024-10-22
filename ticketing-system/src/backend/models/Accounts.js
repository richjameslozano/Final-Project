const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user: String,
    password: String,
    lastName: String,
    firstName: String,
    email: String,
    mobileNumber: String,

});

const UserModel = mongoose.model("accounts", UserSchema);

module.exports = UserModel;
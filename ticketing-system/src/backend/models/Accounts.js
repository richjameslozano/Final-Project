const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user:  { type: String, required: true },
    password:  { type: String, required: true },
    lastName:  { type: String, required: true },
    firstName:  { type: String, required: true },
    email:  { type: String, required: true },
    mobileNumber: { type: String, required: true },

});

const UserModel = mongoose.model("accounts", UserSchema);

module.exports = UserModel;
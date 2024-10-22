const mongoose = require('mongoose');
 
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  lastname: String,
  firstname: String,
  email: String,
  number: String
});
 
const UserModel = mongoose.model("accounts", UserSchema);
 
module.exports = UserModel;

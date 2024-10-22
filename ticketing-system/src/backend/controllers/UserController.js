const UserModel = require('../models/Accounts'); // Ensure this path is correct


//create account
const createUser = (req, res) => {
    const newUser = new UserModel(req.body);
    newUser.save()
        .then(user => res.json(user))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Internal Service Error" });
        });
};

//login users fetching data
const getUsers = (req, res) => {
    UserModel.find()
      .then(users => res.json(users))
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  };



module.exports = { createUser, getUsers };

const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
 

//get for login
router.get('/getUsers', userController.getUsers);

//cart item remove
// router.delete('/deleteUser/:id', userController.deleteUser);

//creating account
router.post('/signup', userController.createUser);


// router.put('/updateUser/:id', userController.updateUser);
 
module.exports = router;
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
 
// router.get('/getUsers', UserController.getUsers);
router.post('/createUser',UserController.createUser);
 
module.exports = router;
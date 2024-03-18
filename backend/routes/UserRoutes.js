const express = require('express');
const router = express.Router();

// importing controllers

// importing user controller
const {createUser,loginUser} =require('../controllers/Usercontroller')

// creating routes

// User login signup routes
router.post('/createUser',createUser)
router.post('/loginUser',loginUser)



// exporting routes as single router
module.exports = router;
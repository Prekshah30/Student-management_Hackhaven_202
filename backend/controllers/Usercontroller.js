const User = require('../models/User')
const mongoose = require('mongoose')


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// register user controller
const createUser = async (req, res) => {
    // hashing password
    const salt  = await bcrypt.genSalt(10)
    const secPassword = await bcrypt.hash(req.body.password, salt)

    try{
        const user = new User({
            name : req.body.name,
            email:req.body.email,
            password:secPassword
        })
        await user.save()
        res.status(201).send({success:true})
    }
    catch(err){
        res.status(404).send({success:false})
    }
}

// login user controller
const loginUser = async (req, res) => {

    // find user by email
    const user = await User.findOne({
        email:req.body.email
    });
    console.log('User:',user)

    // compare password founded user password with entered password
    let pwdCompare = await bcrypt.compare(req.body.password, user.password)

    console.log('Password compare:',  pwdCompare)

    if(!user){
        return res.status(404).send({success:false,error:'Invalid credentials'})
    }
    if(!pwdCompare){
        return res.status(404).send({success:false,error:'Invalid credentials'})
    }
    // jwt token
    const data = {
        user :{
            id:user._id
        }
    }
    const jwtSecret ='DEEPVYAS03';
    // signing using jwt secret key
    const authtoken = jwt.sign(data,jwtSecret)


    // authtoken needs to be stored in local storage
    return res.status(200).send({user,success:true,authtoken:authtoken})


}

// export both controllers individually to use in routes
module.exports = {createUser,loginUser}
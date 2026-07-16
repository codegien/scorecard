const User = require('../models/User.model');
const api  = require('../utils/apiResponse')
const jwt = require('jsonwebtoken')
//reg

const signToken = (id)=> jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});

exports.register = async (req, res, next)=> {
    try{
        const {fullName, email, password, role} = req.body;
        const existing = await User.findOne({email});
        if(existing) return next(new AppError('Email already in used', 409));

        const user = await User.create({ fullName, email, password, role});
       const token = signToken(user._id);
        //const token = 'tokenizedtoken';

        api.created(res, { token, user}, 'Admin account created');
    }catch(err){
        next(err);
    }
}
//login - sign jwt
//getprofile
//change password
//logout

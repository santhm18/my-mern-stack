const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const  { API_KEY } = process.env;
const userSchema = new mongoose.Schema({
    firstname : {
        type: String,
        required: true,
        trim: true
    },
    lastname : {
        type: String,
        required: true,
        trim: true
    },
    email : {
        type: String,
        unique: true,
        trim: true
    },
    password : {
        type: String,
        minlength: 7,
        trim: true
    },
    phoneNumber : {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
     },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    token: { 
        type: String
     }
});

// virtual altributes ( who owns what and how der are related)
userSchema.virtual('memories',{
    ref: 'Memory',
    localField: '_id',
    foreignField: 'owner'

});

// Only generate token for new user and for existing user
userSchema.methods.generateAuthToken = async function () {
    const user =  this;
    const token = jwt.sign({_id : user._id.toString()}, API_KEY,{
        expiresIn: "24h"
    });
    user.token = token;
    // user.tokens =  token;
    // user.tokens =  user.tokens.concat({token});
    user.save();
    return token;
}

//delete token

userSchema.statics.deleteAuthToken= async function(token,cb){
    const user=this;
    user.updateOne({$unset : {token :1}},function(err,user){
        if(err) return cb(err);
        cb(null,user);
    })
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
   
    if(!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if(!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
}

// run a code before saved or save method is called to hash the plain text password before saving
userSchema.pre('save', async function(next) {
    const user =  this;
   if(user.isModified('password')) {
       console.log('new registration of user');
        user.password = await bcrypt.hash(user.password, 8);
   }
    next();
});

const User = mongoose.model('User', userSchema)
module.exports = User;
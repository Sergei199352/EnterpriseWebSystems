const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({

    adress:{
        type:String
    
    },
    email:{
        type:String,

    }










})

userSchema.plugin(passportLocalMongoose)
const Users = new mongoose.model('Users', userSchema)

module.exports = Users;
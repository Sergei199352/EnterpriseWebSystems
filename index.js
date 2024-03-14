
// adding the required packages
const express = require('express');
const app = express();
const path  = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local');




// adding the models for database
const Tickets = require('./models/Tickets')
const Prises = require('./models/Prises')
const Users = require('./models/Users')

// setting the ejs engine and other app.use middlewares

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const sessionConfig = {
    secret:'someSecret',
    resave:false,
    saveUninitialized:true,
    cookie: {
        httpOnly:true,
        expires:Date.now() + 1000 * 60*60*24*7,
        maxAge:1000*60*60*24*7
    }
}
app.use(session(sessionConfig))



app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(passport.initialize);
app.use(passport.session)


// connecting to mongo

mongoose.connect('mongodb://localhost:27017/webSistems')
.then(()=> {
    console.log('Mongo connection open')
}).catch(err =>{
    console.log('MOngo errorrrrr')
    console.log(err)
});
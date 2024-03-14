
// adding the required packages
const express = require('express');
const app = express();
const path  = require('path');
const mongoose = require('mongoose');


// adding the models for database
const Tickets = require('./models/Tickets')
const Prises = require('./models/Prises')
const Users = require('./models/Users')

// setting the ejs engine and other app.use middlewares

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));


// connecting to mongo

mongoose.connect('mongodb://localhost:27017/webSistems')
.then(()=> {
    console.log('Mongo connection open')
}).catch(err =>{
    console.log('MOngo errorrrrr')
    console.log(err)
});
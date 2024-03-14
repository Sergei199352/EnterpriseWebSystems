
// adding the required packages
const express = require('express');
const app = express();
const path  = require('path');
const mongoose = require('mongoose');


// adding the models for database
const Tickets = require('./models/Tickets')
const Prises = require('./models/Prises')
const Users = require('./models/Users')

mongoose.connect('mongodb://localhost:27017/webSistems')
.then(()=> {
    console.log('Mongo connection open')
}).catch(err =>{
    console.log('MOngo errorrrrr')
    console.log(err)
});

// adding the required packages
const express = require('express');
const app = express();
const path  = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const flash = require('connect-flash');




const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');





// adding the models for database
const Tickets = require('./models/Tickets')
const Prises = require('./models/Prises')
const Users = require('./models/Users')


const userRounts = require('./routes/users')

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

// passport setup
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())
// flash middleware
app.use((req,res,next) =>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next()
})

app.use('/', userRounts)


passport.use(new LocalStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

// connecting to mongo

mongoose.connect('mongodb://localhost:27017/webSistems')
.then(()=> {
    console.log('Mongo connection open')
}).catch(err =>{
    console.log('MOngo errorrrrr')
    console.log(err)
});

app.get('/fu', async (req,res) =>{
    const user = new Users({email:'sergey@example.com',username:'cotttt', adress:'viva la vida loca'});
    const newUser = await Users.register(user, "chicken");
    res.send(newUser)
})
// /register

app.get('/',(req, res)=>{
    
    res.render('mainPage')
})



app.listen(3000, () => {
    console.log('app is listeniong on port 3000')
})
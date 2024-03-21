

// the whole project was created by following the udemy course https://www.udemy.com/course/the-web-developer-bootcamp

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
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
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

app.get('/',async (req, res)=>{

    const prises = await Prises.find({})
    
    res.render('mainPage', {prises})
})
// chatgbt generated
function generateTicketId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let ticketId = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        ticketId += characters.charAt(randomIndex);
    }
    return ticketId;
}

// Route to handle the creation of a new ticket
app.post('/createTicket', (req, res) => {
    // Extract the username from the current user object
    const username = req.user ? req.user.username : 'Guest'; // If no user is logged in, set username to 'Anonymous'

    // Generate a ticket ID
    const ticketId = generateTicketId(6);

    // Extract ticket data from the request body
    const ticketData = {
        ...req.body,
        username: username,
        ticketId: ticketId
    };

    // Create a new ticket with the provided data
    Tickets.create(ticketData)
        .then(ticket => {
            req.flash('success', `Ticket created successfully your ticked Id is ${ticketId}` );
            res.redirect('/'); // Redirect to the homepage or any other page
        })
        .catch(err => {
            console.error('Error creating ticket:', err);
            res.status(500).send('Error creating ticket');
        });
});

app.get('/prise/:id', async (req, res) => {
    try {
        const prise = await Prises.findById(req.params.id);
        if (!prise) {
            req.flash('error', 'Prize not found');
            return res.redirect('/');
        }
        res.render('priseDetails', { prise });
    } catch (error) {
        console.error('Error retrieving prize details:', error);
        req.flash('error', 'Error retrieving prize details');
        res.redirect('/');
    }
});



app.listen(3000, () => {
    console.log('app is listeniong on port 3000')
})
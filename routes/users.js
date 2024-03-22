const express = require('express');
const router = express.Router();
const passport = require('passport')
const User = require('../models/Users')
const Prise = require('../models/Prises')
const Tickets = require('../models/Tickets')
const catchAsync = require('../utils/catchAsync')
const {isLoggedIn} = require('../middleware')
const {prizeOwner} = require('../middleware')

const categories = ['Car', 'Phone', 'Ticket', 'Other'];
router.get('/register', (req,res)=>{
    res.render('users/register')
});
router.post('/register', catchAsync(async (req, res) => {
    try {
        const { email, username, password, priseOwner, adress } = req.body;
        const user = new User({ email, username, priseOwner: priseOwner === 'true', adress });
        const registeredUser = await User.register(user, password);
        console.log(registeredUser);
        req.flash('success', 'Registration successful. Please log in.');
        res.redirect('/login');
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}));
// profile get route

router.get('/profile', isLoggedIn, async (req, res) => {
    try {
        // Fetch the current user's entered prizes data
        const currentUserPrises = await Prise.find({ username: req.user.username });

        // Fetch the tickets attached to the current user's username
        const currentUserTickets = await Tickets.find({ username: req.user.username });

        res.render('users/profile', { currentUserPrises, currentUserTickets });
    } catch (error) {
        console.error('Error fetching user data:', error);
        req.flash('error', 'Error fetching user data');
        res.redirect('/');
    }
});
// add prise get method

router.get('/addPrise',prizeOwner,isLoggedIn, (req,res) =>{
    res.render('users/prises', {categories})
})
router.post('/addPrise', prizeOwner, isLoggedIn, async (req, res) => {
    try {
        const username = req.user.username;
        const priseData = {
            username: username,
            prise: req.body.prise,
            priseDate: req.body.priseDate,
            priseTime: req.body.priseTime,
            priseCategory: req.body.priseCategory
        };
        const prise = new Prise(priseData);
        await prise.save();
        res.send(prise);
    } catch (error) {
        console.error('Error saving prize:', error);
        res.status(500).send('Error saving prize');
    }
});

// Route to randomly select a ticket as winner
router.post('/selectWinner', async (req, res) => {
    try {
        // Find all tickets
        const tickets = await Tickets.find();

        // Check if there are any tickets
        if (tickets.length === 0) {
            req.flash('error', 'No tickets found');
            return res.redirect('/');
        }

        // Select a random ticket from the list
        const randomIndex = Math.floor(Math.random() * tickets.length);
        const selectedTicket = tickets[randomIndex];

        // Set the winner value of the selected ticket to true
        selectedTicket.winner = true;
        selectedTicket.priseActive = false

        // Save the updated ticket
        await selectedTicket.save();

        // Find the corresponding prize using the _id of the selected ticket
        const correspondingPrize = await Prise.findById(selectedTicket.priseId);

        if (!correspondingPrize) {
            throw new Error('Corresponding prize not found');
        }

        // Set the draw value of the corresponding prize to true
        correspondingPrize.draw = true;

        // Save the updated prize
        await correspondingPrize.save();

        // updating all the tickets of the prise that its no more active
        await Tickets.updateMany({ priseId: selectedTicket.priseId }, { $set: { priseActive: false } });

        req.flash('success', `And the winner is ${selectedTicket.ticketId}`);
        res.redirect('/profile');
    } catch (error) {
        console.error('Error selecting winner:', error);
        req.flash('error', 'Error selecting winner');
        res.redirect('/');
    }
});




// login get route

router.get('/login', (req, res) =>{


    res.render('users/login')
});

// the passport library allows you to have different authentication strategies
// the local authenticates locally, but we could have also google or other

router.post('/login', passport.authenticate('local', {failureFlash:true, failureRedirect:'/login'}), (req, res)=>{

    req.flash('success', 'welcome back');
    res.redirect('/')

})
router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/');
    });
}); 

module.exports = router;
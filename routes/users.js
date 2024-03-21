const express = require('express');
const router = express.Router();
const passport = require('passport')
const User = require('../models/Users')
const Prise = require('../models/Prises')
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

router.get('/profile', isLoggedIn, (req, res) =>{


    
    res.render('users/profile')

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

// TODO create the post or put function, look into mongoose in case you need to make put and not post


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
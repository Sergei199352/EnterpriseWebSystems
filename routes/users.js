const express = require('express');
const router = express.Router();
const passport = require('passport')
const User = require('../models/Users')
const catchAsync = require('../utils/catchAsync')
const {isLoggedIn} = require('../middleware')
const {authPrizeOwner} = require('../middleware')

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

router.get('/addPrise', (req,res) =>{
    res.render('users/prises', {categories})
})


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
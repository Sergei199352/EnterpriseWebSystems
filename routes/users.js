const express = require('express');
const router = express.Router();
const passport = require('passport')
const User = require('../models/Users')
const catchAsync = require('../utils/catchAsync')
router.get('/register', (req,res)=>{
    res.render('users/register')
});
router.post('/register', catchAsync(async (req,res) =>{

    try{

    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    console.log(registeredUser);
    res.redirect('/register');
    }catch(e){
        req.flash('error',e.message)
        res.redirect('/register')
    }
    
    
}));

router.get('/login', (req, res) =>{


    res.render('users/login')
});

// the passport library allows you to have different authentication strategies
// the local authenticates locally, but we could have also google or other

router.post('/login', passport.authenticate('local', {failureFlash:true, failureRedirect:'/login'}), (req, res)=>{

    req.flash('success', 'welcome back');
    res.redirect('/')

})

module.exports = router;
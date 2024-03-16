const express = require('express');
const router = express.Router();
const User = require('../models/Users')

router.get('/register', (req,res)=>{
    res.render('users/register')
});
router.post('/register', async (req,res) =>{
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        console.log(registeredUser);
        res.redirect('/register');
    } catch(e) {
        console.log(e);
        res.status(500).send("Error registering user");
        res.redirect('/register')
    }
});


module.exports = router;
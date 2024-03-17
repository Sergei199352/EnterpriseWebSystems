
// moved this method to middleware that can be exported to save space
// also i can easily reuse this code in any route

module.exports.isLoggedIn = (req,res, next) =>{
    if(!req.isAuthenticated()){
        req.flash('error', 'Please sign in');
        return res.redirect('/login');
    }
    next()
}

module.exports.prizeOwner = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'Please sign in');
        return res.redirect('/login');
    }
    
    // Assuming you have stored user information in req.user after authentication
    const user = req.user;
    
    if (!user.priseOwner) {
        req.flash('error', 'You are not authorized to access this resource');
        return res.redirect('/'); // Redirect to a suitable page if the user is not a prize owner
    }

    // If the user is authenticated and is a prize owner, proceed to the next middleware
    next();
};
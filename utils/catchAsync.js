// async errors catcher
// used to pass any async errors to the express error handlisng middleware

module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}
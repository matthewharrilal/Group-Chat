var isUserAuthorized = module.exports = (req, res, next) => {
    console.log('This is the user ' + JSON.stringify(req.user))
    if (!req.user) {
        console.log("HEREEEEEE")
        return res.redirect('/signup')
    } else {
        next()
    }
}

const jwt = require('jsonwebtoken');

var checkAuth = module.exports = (req, res, next) => {
    console.log("Checking authentication");
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
        console.log('User is null')
        req.user = null;
        // return res.redirect('/')
    } else {
        var token = req.cookies.nToken;
        console.log('This is the token present on the request ' + token)
        var decodedToken = jwt.decode(token, {
            complete: true
        }) || {};
        console.log('This is the decoded JWT token user ' + JSON.stringify(decodedToken.payload))
        req.user = decodedToken.payload;
        res.locals.user = req.user // Every request has this middleware with it therefore every request has a scope to the local properties such as the user
    }

    next();
};



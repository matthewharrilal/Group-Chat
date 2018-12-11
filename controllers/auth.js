var User = require("../models/user")
const jwt = require('jsonwebtoken');


module.exports = (app) => {
    // Route Stubs
    app.get('/signup/new', (req, res) => {
        res.render('../views/signup')
    })

    app.post("/signup", (req, res) => {
        console.log("Request Body " + JSON.stringify(req.body))
        if (req.body.password == req.body.passwordConfirmation) {
            const user = new User(req.body)
            user
                .save()
                .then((user) => {
                    var token = jwt.sign({
                        _id: user._id,
                        admin: true
                    }, process.env.SECRET, {
                        expiresIn: "60 days"
                    });
                    res.cookie('nToken', token, {
                        maxAge: 900000,
                        httpOnly: true
                    });
                    console.log('This is the token ' + token)
                    res.redirect('/')
                })
                .catch((err) => {
                    console.log('ERROR ' + err)
                })
        } else {
            alert("Please make sure both passwords match!");
        }
    })

    app.get("/login/new", (req, res) => {
        res.render("./login")
    })

    app.post("/login", (req, res) => {
        res.send("Logging User In")
    })
}
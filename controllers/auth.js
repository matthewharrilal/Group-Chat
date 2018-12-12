var User = require("../models/user")
const jwt = require('jsonwebtoken');
const localStorage = require("store")


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
                    localStorage.set("newUsername", req.body.username)
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
        const username = req.body.username; // Grab the username and password credentials
        const password = req.body.password;
        // Find this user name
        User.findOne({ // Find user by the username
                username
            }, "username password")
            .then(user => {
                if (!user) {
                    // User not found
                    return res.status(401).send({
                        message: "Wrong Username or Password"
                    });
                }
                // Check the password
                user.comparePassword(password, (err, isMatch) => {
                    if (!isMatch) {
                        // Password does not match
                        return res.status(401).send({
                            message: "Wrong Username or password"
                        });
                    }
                    // Create a token
                    const token = jwt.sign({
                        _id: user._id,
                        username: user.username,
                    }, process.env.SECRET, {
                        expiresIn: "60 days"
                    });
                    // Set a cookie and redirect to root
                    res.cookie("nToken", token, {
                        maxAge: 900000,
                        httpOnly: true
                    });
                    console.log("SUCCESSFULL LOGIN")
                    res.redirect("/");
                });
            })
            .catch(err => {
                console.log(err);
            });

    });

    app.get('/logout', (req, res) => {
        res.clearCookie('nToken');
        res.redirect('/');
    });

}




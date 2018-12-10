module.exports = (app) => {
    // Route Stubs
    app.get('/signup/new', (req, res) => {
        res.render('../views/signup')
    })

    app.post("/signup", (req, res) => {
        res.send("Signing User Up")
    })

    app.get("/login/new", (req, res) => {
        res.send("You have reached the login form route")
    })

    app.post("/login", (req, res) => {
        res.send("Logging User In")
    })
}
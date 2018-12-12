module.exports = (app) => {
    app.post("/users/:userId/messages", (req, res) => {
        console.log(req.body)
        res.send("YERR REACHED THE MESSAGES ROUTE")
    });
}
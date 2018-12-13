const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should()
chai.use(chaiHttp);
var User = require("../models/user")

var agent = chai.request.agent(server) // Going to act as our request triggerer

describe("User", function () { // Test suite describing the user logic
    it("should not be able to login if they have not registered", done => {
        agent.post("/login", (req, res) => {
            res.status.should.be.equal(401); // Return error code because user credentials are not valid
            done();
        })
    });

    it("should be able to sign a user up", done => {
        User.findByIdAndRemove({
            username: "testone"
        }, function () {
            agent
                .post("/signup") // Trigger sign up request when given credentials below
                .send({
                    username: "testone",
                    password: "password"
                })
                .end(function (err, res) {
                    console.log(res.body)
                    res.should.have.status(200);
                    agent.should.have.cookie("nToken"); // When triggering a singnup request a cookie should then be contained on all subsrqurent authorized requests
                    done();
                });
        })
    });

    it("should be able to log a user out", done => {
        agent
            .get("/logout")
            .end(function (err, res) {
                res.should.have.status(200);
                agent.should.not.have.cookie("nToken"); // Logout request should clear user session through the cookie
                done();
            });
    });


    it("should be able to log a user in", done => {
        User.findOneAndRemove({
            username: "username"
        }, function () {
            agent
                .post("login")
                .send({
                    username: "username",
                    password: "password"
                })
                .end(function (err, res) {
                    res.should.have.status(200); // Remove user after checking for successful status code
                    agent.should.have.cookie("nToken");
                    done();
                });
        });

    });

    before(done => {
        agent
            .post("/login")
            .send({
                username: "testone",
                password: "password"
            })
            .end(function (err, res) {
                done();
            });
    });
});
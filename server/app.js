// required dependencies
require('dotenv').config()
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const session = require('express-session');

// routes
const profileRoute = require("./routes/profile");
const voteRoute = require("./routes/vote");
const scoreboardRoute = require("./routes/scoreboard");
const promptRoute = require("./routes/prompt");
const loginRoute = require("./routes/login");
const signupRoute = require("./routes/signup");
const landingRoute = require("./routes/landing");

// app and app setup
const app = express();
app.use(session({
    secret: "impromptuSecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use('/profile', profileRoute);
app.use("/vote", voteRoute);
app.use('/scoreboard', scoreboardRoute);
app.use("/prompt", promptRoute);
app.use("/login", loginRoute);
app.use("/signup", signupRoute);
app.use("/landing", landingRoute);



// start app
mongoose.connect(process.env.MONGO_URL)
    .then(
        app.listen("8000", () => console.log("Server started on port 8000"))
    )
    .catch(err => console.log(err));

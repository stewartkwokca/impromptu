// required dependencies
require('dotenv').config()
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const session = require('express-session');
var schedule = require('node-schedule');

// routes
const profileRoute = require("./routes/profile");
const voteRoute = require("./routes/vote");
const scoreboardRoute = require("./routes/scoreboard");
const promptRoute = require("./routes/prompt");
const loginRoute = require("./routes/login");
const signupRoute = require("./routes/signup");
const landingRoute = require("./routes/landing");

// for accessing user's database daily
const User = require("./models/userModel");

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

// start app, only if connection made
mongoose.connect(process.env.MONGO_URL)
    .then(async () => {
            schedule.scheduleJob({hour: 0, minute: 0}, async () => { // reset users' daily submission status at midnight PST
                await User.updateMany({}, {"submitted": false});
            });

            app.listen("8000", () => console.log("Server started on port 8000"));
        }
    )
    .catch((err) => console.log(err));
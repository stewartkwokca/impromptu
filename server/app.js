// required dependencies
require('dotenv').config()
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const session = require('express-session');
var schedule = require('node-schedule');
const {generatePrompt} = require("./promptGenerator")

// routes
const profileRoute = require("./routes/profile");
const voteRoute = require("./routes/vote");
const scoreboardRoute = require("./routes/scoreboard");
const promptRoute = require("./routes/prompt");
const loginRoute = require("./routes/login");
const logoutRoute = require("./routes/logout");
const signupRoute = require("./routes/signup");
const landingRoute = require("./routes/landing");
const feedRoute = require("./routes/feed");
const historyRoute = require("./routes/history");
const hasSubmittedRoute = require("./routes/hasSubmitted");

// for accessing daily actions
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
app.use(cors({credentials: true, origin: "http://localhost:3000"}));

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
app.use("/feed", feedRoute);
app.use("/logout", logoutRoute);
app.use("/getHistory", historyRoute);
app.use("/hasSubmitted", hasSubmittedRoute);

// start app, only if connection made
mongoose.connect(process.env.MONGO_URL)
    .then(async () => {
            schedule.scheduleJob({hour: 0, minute: 0, second: 0}, async () => { // reset users' daily submission status at midnight PST
                await User.updateMany({}, {"submitted": false});
                generatePrompt();
            });

            app.listen("8000", () => console.log("Server started on port 8000"));
        }
    )
    .catch((err) => console.log(err));
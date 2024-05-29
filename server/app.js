// required dependencies
require('dotenv').config()
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const session = require('express-session');
var schedule = require('node-schedule');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// routes
const profileRoute = require("./routes/profile");
const voteRoute = require("./routes/vote");
const scoreboardRoute = require("./routes/scoreboard");
const promptRoute = require("./routes/prompt");
const loginRoute = require("./routes/login");
const signupRoute = require("./routes/signup");
const landingRoute = require("./routes/landing");

// for accessing daily actions
const User = require("./models/userModel");
const Prompt = require("./models/promptModel");

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
            schedule.scheduleJob({hour: 0, minute: 0, second: 0}, async () => { // reset users' daily submission status at midnight PST
                await User.updateMany({}, {"submitted": false});
                generatePrompt();
            });

            app.listen("8000", () => console.log("Server started on port 8000"));
        }
    )
    .catch((err) => console.log(err));

async function generatePrompt() {
    try{
        const googleGenAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const prompt_generator = googleGenAI.getGenerativeModel({ model: "gemini-pro"});

        const input = "Please generate a unique prompt in the style of the popoular jackbox game quiplash. Please only return the prompt with no other text. Keep it PG-13. Make it a fill-in-the-blank."
        const result = await prompt_generator.generateContent(input);
        const response = await result.response;
        const prompt = response.text();

        const newPrompt = {text: prompt};

        await Prompt.create(newPrompt);
    } catch (err) {
        generatePrompt();
    }
}
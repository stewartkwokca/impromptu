const express = require("express");
const router = express.Router();
const Response = require("../models/responseModel.js");
const User = require('../models/userModel');
const { GoogleGenerativeAI } = require("@google/generative-ai");

router.get("/", async (req, res) => {
    try{
        const googleGenAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const prompt_generator = googleGenAI.getGenerativeModel({ model: "gemini-pro"});

        const input = "Please generate a unique prompt in the style of the popoular jackbox game quiplash. Please only return the prompt with no other text. Keep it PG-13. Make it a fill-in-the-blank."
        const result = await prompt_generator.generateContent(input);
        const response = await result.response;
        const prompt = response.text();

        return res.json({"prompt": prompt});
    } catch (err) {
        console.log(err);
        return res.redirect("/prompt");
    }
});

router.post("/", (req, res) => { // submit to a prompt
    // once authentication added, redirect to scoreboard if player has voted
    if (req.session.submitted){
        res.redirect("/scoreboard");
    }
    return res.redirect("/prompt");
});

router.post("/submit", async (req, res) => { // submit to a prompt
    if (!req.body.user || !req.body.text){
        return res.status(400).send("Missing user or text field");
    }

    const user = await User.findOne({username: req.body.user});

    if (!user) {
        return res.status(404).send("User not found");
    }

    if (user.submitted) {
        return res.status(403).send("Can't submit again!");
    }
    if (!req.session.username || req.session.username != req.body.user){
        return res.redirect("/login");
    }

    const newResponse = {
        votes: 0,
        views: 0,
        user: req.body.user,
        response: req.body.text
    }

    const response = await Response.create(newResponse);
    
    req.session.submitted = true;
    
    await User.findOneAndUpdate({username: req.body.user}, {submitted: true}, {new : true});

    return res.send(response);
});

module.exports = router;
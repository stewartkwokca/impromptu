const express = require("express");
const router = express.Router();
const Response = require("../models/responseModel.js");
const User = require('../models/userModel');
const Prompt = require('../models/promptModel');
const {generatePrompt} = require("../promptGenerator.js");

router.get("/", async (req, res) => {
    const today = new Date();
    const mm = today.getMonth()+1;
    const dd = today.getDate();
    const yyyy = today.getFullYear();
    let prompt = await Prompt.findOne({createdAt: { "$gte": `${yyyy}-${mm}-${dd}` }});
    if (!prompt){
       prompt = await generatePrompt();
    }
    return res.json(prompt);
});

router.post("/", (req, res) => {

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
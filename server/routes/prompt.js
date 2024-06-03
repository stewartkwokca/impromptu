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
       prompt = await generatePrompt({createdAt: { "$gte": `${yyyy}-${mm}-${dd}` }});
    }
    return res.json(prompt);
});

router.get("/:date", async (req, res) => { // date should be in yyyymmdd format
    const dateQueried = new Date(req.params.date.substring(0, 4), Number(req.params.date.substring(4, 6))-1, req.params.date.substring(6));
    const nextDate = new Date(req.params.date.substring(0, 4), Number(req.params.date.substring(4, 6))-1, req.params.date.substring(6));
    nextDate.setDate(dateQueried.getDate()+1);

    const startMM = dateQueried.getMonth()+1;
    const startDD = dateQueried.getDate();
    const startYYYY = dateQueried.getFullYear();

    const endMM = nextDate.getMonth()+1;
    const endDD = nextDate.getDate();
    const endYYYY = nextDate.getFullYear();

    const filter = {createdAt: { "$gte": `${startYYYY}-${startMM}-${startDD}`, "$lt": `${endYYYY}-${endMM}-${endDD}`}};
    const prompt = await Prompt.findOne(filter);

    if (!prompt){
        return res.status(404).send("Requested prompt not found");
    }
    return res.json(prompt);
})

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

    const today = new Date();
    const mm = today.getMonth()+1;
    const dd = today.getDate();
    const yyyy = today.getFullYear();

    let prompt = await Prompt.findOne({createdAt: { "$gte": `${yyyy}-${mm}-${dd}` }});
    if (!prompt) {
        return res.status(500).redirect("/");
    }

    const newResponse = {
        votes: 0,
        views: 0,
        user: req.body.user,
        userID: req.session.userID,
        response: req.body.text,
        promptID: prompt._id,
        promptText: prompt.text
    }

    const response = await Response.create(newResponse);
    console.log(response._id.toString());
    req.session.submitted = true;
    const userResponses = user.responses || [];
    userResponses.push(response._id.toString());

    await User.findOneAndUpdate({username: req.body.user}, {submitted: true, responses: userResponses}, {new : true});

    return res.send(response);
});

module.exports = router;
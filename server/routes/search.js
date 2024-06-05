const express = require("express");
const router = express.Router();
const Prompt = require("../models/promptModel");
const User = require('../models/userModel');


router.post("/users", async (req, res) => {
    const username = req.body.prompt || "";
    const results = await User.find({"username": {$regex: username, $options: 'i'}}, {username: 1, _id: 1});
    res.send(results);
    return;
});

router.post("/prompts", async (req, res) => {
    const prompt = req.body.prompt || "";
    const results = await Prompt.find({"text": {$regex: prompt, $options: 'i'}}, {text: 1, _id: 1, createdAt: 1});
    res.send(results);
    return;
})

router.post("/dates", async(req, res) => {
    const date = req.body.date.split('-');
    const dateObj = new Date(`${date[0]},${date[1]},${date[2]}`);
    const tmrw = new Date(`${date[0]},${date[1]},${date[2]}`);
    tmrw.setDate(dateObj.getDate()+1);
    const prompt = await Prompt.findOne({"createdAt": {$gte: dateObj, $lte: tmrw}}, {_id: 0, text: 1});
    console.log(prompt);
    if (!prompt) res.send({"error": "no prompt for that day"});
    else res.send(prompt);
    return;
})

module.exports = router;
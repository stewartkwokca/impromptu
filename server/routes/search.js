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

module.exports = router;
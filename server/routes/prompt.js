const express = require("express");
const router = express.Router();
const Response = require("../models/responseModel.js");

router.get("/", (req, res) => {
    res.send("Prompt route");
});

router.post("/", (req, res) => { // submit to a prompt
    // once authentication added, redirect to scoreboard if player has voted
    if (false){
        res.redirect("/scoreboard");
    }
    return res.json({"success" : true});
});

router.post("/submit", async (req, res) => { // submit to a prompt
    if (!req.body.user || !req.body.text){
        res.status(400).send("Missing user or text field");
    }
    const newResponse = {
        votes: 0,
        user: req.body.user,
        response: req.body.text
    }

    const response = await Response.create(newResponse);

    res.send(response);
});

module.exports = router;
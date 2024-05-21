const express = require("express");
const router = express.Router();
const Response = require("../models/responseModel.js");

let limit = 10; // change to show different number of responses on scoreboard

router.get("/", async (req, res) => {
    const responses = await Response.find().sort({votes: -1}).limit(limit);
    return res.json({responses: responses});
});

router.post("/", (req, res) => {
    return res.redirect("/scoreboard");
});

module.exports = router;
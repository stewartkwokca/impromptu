const express = require("express");
const router = express.Router();
const ResponseModel = require("../models/responseModel.js");

let limit = 10; // change to show different number of responses on scoreboard

router.get("/", async (req, res) => {
    const responses = await ResponseModel.find().sort({views: -1}).limit(limit);
    return res.json({responses: responses});
});

router.post("/", (req, res) => {
    return res.redirect("/scoreboard");
});

module.exports = router;
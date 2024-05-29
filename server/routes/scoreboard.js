const express = require("express");
const router = express.Router();
const Response = require("../models/responseModel.js");

let limit = 10; // change to show different number of responses on scoreboard

router.get("/", async (req, res) => {
    const today = new Date();
    const mm = today.getMonth()+1;
    const dd = today.getDate();
    const yyyy = today.getFullYear();
    const responses = await Response.find({createdAt: { "$gte": `${yyyy}-${mm}-${dd}` }}).sort({votes: -1}).limit(limit);
    return res.json({responses: responses});
});

router.post("/", (req, res) => {
    return res.redirect("/scoreboard");
});

module.exports = router;
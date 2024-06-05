const express = require("express");
const router = express.Router();
const Response = require("../models/responseModel.js");

let limit = 25; // change to show different number of responses on scoreboard

router.get("/", async (req, res) => {
    const today = new Date();
    const mm = today.getMonth()+1;
    const dd = today.getDate();
    const yyyy = today.getFullYear();
    const responses = await Response.find({createdAt: { "$gte": `${yyyy}-${mm}-${dd}` }}).sort({votes: -1}).limit(limit);
    return res.json({responses: responses});
});

router.get("/:date", async (req, res) => {
    const d = req.params.date.split("-");
    const dateQueried = new Date(d[0], d[1]-1, d[2]);
    const nextDate = new Date(d[0], d[1]-1, d[2]);
    nextDate.setDate(dateQueried.getDate()+1);

    const startMM = dateQueried.getMonth()+1;
    const startDD = dateQueried.getDate();
    const startYYYY = dateQueried.getFullYear();

    const endMM = nextDate.getMonth()+1;
    const endDD = nextDate.getDate();
    const endYYYY = nextDate.getFullYear();

    const filter = {createdAt: { "$gte": `${startYYYY}-${startMM}-${startDD}`, "$lt": `${endYYYY}-${endMM}-${endDD}`}};
    const responses = await Response.find(filter).sort({votes: -1}).limit(limit);
    return res.json({responses: responses});
});

router.post("/", (req, res) => {
    return res.redirect("/scoreboard");
});

module.exports = router;
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Vote route");
});

router.post("/", (req, res) => {
    return res.redirect("/vote");
});

module.exports = router;
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Scoreboard route");
});

router.post("/", (req, res) => {
    return res.redirect("/scoreboard");
});

module.exports = router;
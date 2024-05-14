const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Prompt route");
});

router.post("/", (req, res) => {
    // once authentication added, redirect to scoreboard if player has voted
    if (false){
        res.redirect("/scoreboard");
    }
    return res.json({"success" : true});
});

module.exports = router;
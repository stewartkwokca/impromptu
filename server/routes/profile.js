const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Profile route");
});

router.post("/", (req, res) => {
    return res.redirect("/profile");
});

module.exports = router;

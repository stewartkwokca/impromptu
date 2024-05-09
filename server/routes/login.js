const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Login route");
});

router.post("/", (req, res) => {
    return res.redirect("/");
});

module.exports = router;

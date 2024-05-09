const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Prompt route");
});

router.post("/", (req, res) => {
    return res.redirect("/");
});

module.exports = router;
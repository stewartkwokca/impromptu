const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/userModel');

router.post("/", (req, res) => {
    console.log(req.session);
    req.session.destroy();
    res.send({message: "Logged out"});
});

module.exports = router;

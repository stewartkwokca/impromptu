const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/userModel');

router.get("/", (req, res) => {
    console.log(req.session);
    if (req.session.userID) {
        res.status(200).send({"userID": req.session.userID, "username": req.session.username});
        return;
    }
    else {
        return res.send({"error": "no user logged in"});
    }
});

router.post("/", async(req, res) => {
    if (!req.body || 
        !req.body.username || typeof req.body.username != "string" ||
        !req.body.password || typeof req.body.password != "string"
        ) {
        res.status(400).send({"success": false, "error": "invalid request body"});
        return;
    }
    const user = await User.findOne({username: req.body.username});
    if (!user) {
        res.status(400).send({"success": false, "error": "username not found"});
        return;
    }
    const passwordCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordCorrect) {
        res.status(401).send({"success": false, "error": "incorrect password"});
        return;
    }
    req.session['userID'] = user._id.toString();
    req.session['username'] = user.username;
    req.session['submitted'] = user.submitted;
    return res.send({"success": true, "message": "Logged in"});
});

module.exports = router;

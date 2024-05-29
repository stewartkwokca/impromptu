const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
router.use(express.json());
const User = require('../models/userModel');

router.post("/", async(req, res) => {
    if (!req.body || 
        !req.body.username || typeof req.body.username != "string" ||
        !req.body.email || typeof req.body.email != "string" ||
        !req.body.password || typeof req.body.password != "string"
        ) {
        res.status(400).send({"success": false, "error": "invalid request body"});
        return;
    }
    const users = await User.find({username: req.body.username});
    if (users.length>0) {
        res.status(400).send({"success": false, "error": "username already taken"});
        return;
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const userDocument = await User.create({"username": req.body.username, "email": req.body.email, "password": hash, "submitted": false});
    console.log(userDocument);
    req.session['userID'] = userDocument._id.toString();
    res.status(200).send({"success": true, "message": "user created"});
});

module.exports = router;

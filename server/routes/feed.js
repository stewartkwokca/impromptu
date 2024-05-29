const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();
const Response = require("../models/responseModel.js");
const User = require('../models/userModel');

router.get("/", async (req, res) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    if (!req.session.userID) {
        // send default feed for non-logged in users
        const responses = await Response.find({"createdAt": {$gte: date}});
        res.send({"responses": responses});
        return;
    }
    const user = await User.findOne({"_id": req.session.userID});
    if (!user) {
        res.send({"error": "user does not exist"});
        return;
    }
    const viewed = user.responsesViewed || [];
    const responses = await Response.find({"createdAt": {$gte: date}, "_id": {$nin: viewed}});
    res.send(responses);
    return;

});

module.exports = router;
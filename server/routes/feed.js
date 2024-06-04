const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();
const Response = require("../models/responseModel.js");
const User = require('../models/userModel');
const mongoose = require('mongoose');

router.get("/", async (req, res) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    const page = req.query.page || 0;
    if (!req.session.userID) {
        // you must log in to see the feed
        console.log("user not logged in!!!");
        res.send({"error": "no user logged in"});
        return;
    }
    const user = await User.findOne({"_id": req.session.userID});
    if (!user) {
        res.send({"error": "user does not exist"});
        return;
    }
    if (!user.submitted) {
        res.send({"error": "respond to the prompt before voting on others' responses"});
        return;
    }
    voted = user.responsesVoted || [];
    console.log(voted);
    let responses = await Response.find({"createdAt": {$gte: date}, "_id": {$nin: voted}, "userID": {$not: req.session.userID}});
    if (responses.length==0) responses = ["You've viewed all posts for today!"];
    res.send(responses);
    return;

});

module.exports = router;
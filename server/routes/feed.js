const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();
const Response = require("../models/responseModel.js");
const User = require('../models/userModel');
const mongoose = require('mongoose');

function getPage (responses, page) {
    if (responses.length>10) {
        if (page*10>responses.length) {
            responses = [];
        }
        responses = responses.slice(page*10, page*10+10);
    }
    return responses;
}
router.get("/", async (req, res) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    const page = req.query.page || 0;
    if (!req.session.userID || req.query.repeat) {
        // send default feed for non-logged in users
        const responses = getPage(await Response.find({"createdAt": {$gte: date}}), page);
        res.send({"responses": responses});
        await Response.updateMany({"_id": {$in: responses}}, {$inc: {"views": 1}});
        return;
    }
    const user = await User.findOne({"_id": req.session.userID});
    if (!user) {
        res.send({"error": "user does not exist"});
        return;
    }
    let viewed = [];
    if ("responsesViewed" in user) viewed = user.responsesViewed;
    let responses = getPage(await Response.find({"createdAt": {$gte: date}, "_id": {$nin: viewed}}), page);
    console.log(responses);
    for (const response of responses) {
        viewed.push(response._id.toString());
    }
    const result = await User.updateOne({"_id": req.session.userID}, {$set: {"responsesViewed": viewed}});
    await Response.updateMany({"createdAt": {$gte: date}}, {$inc: {"views": 1}});
    if (responses.length==0) responses = ["You've viewed all posts for today!"];
    res.send(responses);
    return;

});

module.exports = router;
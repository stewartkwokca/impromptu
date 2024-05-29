const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();
const Response = require("../models/responseModel.js");
const User = require('../models/userModel');

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
    if (!req.session.userID) {
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
    const viewed = user.responsesViewed || [];
    const responses = getPage(await Response.find({"createdAt": {$gte: date}, "_id": {$nin: viewed}}), page);
    for (const response in responses) {
        viewed.push(response._id);
    }
    await User.updateOne({"_id": req.session.userID}, {$set: {"responsesViewed": viewed}});
    await Response.updateMany({"createdAt": {$gte: date}}, {$inc: {"views": 1}});
    res.send(responses);
    return;

});

module.exports = router;
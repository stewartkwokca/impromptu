const express = require("express");
const UserModel = require('../models/userModel');
const router = express.Router();

router.get("/:username", async (req, res) => {

    const user = await UserModel.findOne({username: req.params.username});

    if (req.session.username){
        return res.json({current_user: req.session.username == req.params.username, queried_user: user});
    }
    return res.json({current_user: false, queried_user: user});
});

router.post("/", (req, res) => {
    if (req.session.username){
        return res.redirect(`/profile/${req.session.username}`);
    }
    return res.redirect("/");
const mongoose = require('mongoose');
const UserModel = require('../models/userModel');

router.get("/:userID?", async(req, res) => {
    let userID = "";
    if (req.params.userID) userID = req.params.userID;
    else {
        // requesting /profile will return profile of currently logged in user
        if (!req.session.userID) {
            res.send({"error": "No user logged in"});
            return;
        }
        userID = req.session.userID;
    }
    if (!mongoose.isValidObjectId(userID)) {
        res.send({"error": "invalid user id"});
        return;
    }
    const userDocument = await UserModel.findOne({"_id": userID});
    if (!userDocument) {
        res.send({"error": "user not found"});
        return;
    }
    let user = userDocument.toObject();
    
    delete user.password;
    res.send(user);
    return;
});

router.post("/edit", async(req, res) => {
    if (!req.session.userID) {
        res.send({"error": "No user logged in"});
        return;
    }
    // add other validation here for every property that can be updated
    if (!req.body) {
        res.status(400).send({"success": false, "error": "invalid request body"});
        return;
    }
    const result = await UserModel.updateOne({"_id": req.session.userID}, {"username": req.body.username, "email": req.body.email, "displayPosts": req.body.displayPosts});
    if (result.modifiedCount) {
        res.send({"success": true, "message": "modified user profile"});
        return;
    }
    res.send({"success": false, "error": "failed to modify user profile"});

});

module.exports = router;

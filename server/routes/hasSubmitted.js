const express = require("express");
const router = express.Router();
const Response = require("../models/responseModel.js");
const User = require('../models/userModel');

router.get("/", async(req, res) => {
    console.log(req.session);
    if (!req.session.userID) {
        res.send({"error": "not logged in"});
        return;
    }
    const user = await User.findOne({"_id": req.session.userID});
    if (!user) {
        res.send({"error": "user does not exist"});
        return;
    }
    res.send({"submitted": user.submitted});
    return;
});


module.exports = router;
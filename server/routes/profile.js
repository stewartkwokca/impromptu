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
});

module.exports = router;

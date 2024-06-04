const express = require("express");
const router = express.Router();
const Response = require("../models/responseModel.js");
const User = require("../models/userModel.js");

router.post("/", async (req, res) => {

    if (req.session.userID){

        const user = await User.findOne({"_id": req.session.userID});
        if (!user) {
            return res.status(404).send("User not found");
        }

        if (!req.body.response_id || !req.body.votes){
            return res.status(400).send("Missing response_id or number of votes");
        }

        if (req.body.votes > 10 || req.body.votes < 1){
            return res.status(400).send("Invalid number of votes")
        }

        let response = await Response.findById(req.body.response_id);;

        if (response.usersVoted.includes(req.session.userID)) { console.log(response.usersVoted); return res.status(401).send("Can't vote twice a day")};

        response = await Response.findByIdAndUpdate(req.body.response_id, { $inc : {"votes" : req.body.votes}, $push: {"usersVoted" : req.session.userID}}, {"new" : true});

        return res.send(response);
    }
});

module.exports = router;
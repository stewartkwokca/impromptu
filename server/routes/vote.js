const express = require("express");
const router = express.Router();
const Response = require("../models/responseModel.js");

router.post("/", async (req, res) => {

    if (req.session.userID){ // later, when authenticated, check for authentication

        // TODO: check if user has voted for this prompt already

        if (!req.body.response_id || !req.body.votes){
            return res.status(400).send("Missing response_id or number of votes");
        }

        if (req.body.votes > 10 || req.body.votes < 1){
            return res.status(400).send("Invalid number of votes")
        }

        const response = await Response.findByIdAndUpdate(req.body.response_id, { $inc : {"votes" : req.body.votes}}, {"new" : true});

        return res.send(response);
    }
});

module.exports = router;
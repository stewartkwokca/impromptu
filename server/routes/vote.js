const express = require("express");
const router = express.Router();
const Response = require("../models/responseModel.js");

router.post("/", async (req, res) => {

    if (true){ // later, when authenticated, check for authentication
        let inc_amt = 1;
        if (false) { // for later, when unvoting, check whether user has voted for already (needs authentication first)
            inc_amt = -1;
        }

        if (!req.body.response_id){
            res.status(400).send("Missing response_id");
        }

        const response = await Response.findByIdAndUpdate(req.body.response_id, { $inc : {"votes" : inc_amt}}, {"new" : true});

        return res.send(response);
    }
});

module.exports = router;
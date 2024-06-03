const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();
const Response = require("../models/responseModel.js");
const User = require('../models/userModel');
const mongoose = require('mongoose');

router.post("/", async(req, res) => {
    const filter = req.body.filter;
    const sort = req.body.sort;
    if (sort && sort!=="top" && sort!=="views" && sort!=="bottom") {
        res.send({"error": "invalid sort"});
        return;
    }
    const results = await Response.find(filter);
    console.log(results);
    res.send({"responses": results});
    return;
})

module.exports = router;
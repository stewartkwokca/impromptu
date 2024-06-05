const express = require("express");
const router = express.Router();

router.get("/animation", (req, res) => {
    let landingText = ["the gambling site for children", "it's like github for lesbians", "the child of myspace and wordle", "as good as napster for the deaf", "a rudimentary summoning ritual for maxwell's demon"];
    res.send({"responses": landingText});
});


module.exports = router;
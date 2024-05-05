const express = require("express");

const app = express();

app.use(express.json());

// GET

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/scoreboard", (req, res) => {

});

app.get("/prompt", (req, res) => {

});

app.get("/vote", (req, res) => {

});

app.get("/profile", (req, res) => {

});

// POST

app.post("/scoreboard", (req, res) => {
    return res.redirect("/scoreboard");
});

app.post("/prompt", (req, res) => {
    return res.redirect("/prompt");
});

app.post("/vote", (req, res) => {
    return res.redirect("/vote");
});

app.post("/profile", (req, res) => {
    return res.redirect("/profile");
});

// start app
app.listen("3000", () => console.log("Server started on port 3000"));
const mongoose = require("mongoose");

const responsesSchema = mongoose.Schema(
    {
        user: {
            type: String,
            required: true
        },
        userID: {
            type: String,
            required: true
        },
        response: {
            type: String,
            required: true
        },
        votes: {
            type: Number,
            required: true
        },
        views: {
            type: Number,
            required: true
        },
        promptID: {
            type: String,
            required: true
        },
        promptText: {
            type: String,
            required: true
        },
        usersVoted: {
            type: Array,
            required: true
        }
    },
    { timestamps: true}
)

module.exports = mongoose.model("response", responsesSchema);

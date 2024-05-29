const mongoose = require("mongoose");

const responsesSchema = mongoose.Schema(
    {
        user: {
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
        }
    },
    { timestamps: true}
)

module.exports = mongoose.model("response", responsesSchema);

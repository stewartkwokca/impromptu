const mongoose = require('mongoose')

const promptSchema = mongoose.Schema(
    {
        text: {
            type: String,
            required: true
        }
    },
    { timestamps: true}
)

module.exports = mongoose.model("prompt", promptSchema);
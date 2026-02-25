const mongoose = require("mongoose")

const postShcema = new mongoose.Schema({
    caption: String,

    image_url: {
        type: String,
        required: [true, "image_url is required"]
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "user id is required"]
    }
})

const postModel = mongoose.model("posts", postShcema)

module.exports = postModel
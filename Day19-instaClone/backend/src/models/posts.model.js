const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({

    caption:{
        type: String,
        default: ""
    },

    image_url:{
        type: String,
        required: [true, "image_url is required"]
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "user id is required"]
    }
})

const postModel = mongoose.model("posts", postSchema)

module.exports = postModel
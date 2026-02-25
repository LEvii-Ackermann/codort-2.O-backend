const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "username is required"],
        unique: [true, "username already exists"]
    },

    email:{
        type: String,
        required: [true, "username is required"],
        unique: [true, "email already exists"]
    },

    password:{
        type: String,
        required: [true, "password is required"]
    },

    profile_image:{
        type: String,
        default: "https://ik.imagekit.io/levii/profile.jpg"
    },

    bio:String
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel
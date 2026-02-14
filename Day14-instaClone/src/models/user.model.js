const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true, "username already exists"],
        reequired:[true, "username is required"]
    },
    
    email:{
        type:String,
        unique:[true,"email already exists"],
        required:[true, "email is required"]
    },

    password:{
        type:String,
        required:[true, "password is required"]
    },

    bio:String,

    profile_image:{
        type:String,
        default:"https://ik.imagekit.io/flxfgchps/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.webp"
    }
})

const userModel = mongoose.model("users",  userSchema)

module.exports = userModel